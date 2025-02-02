import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../constants/api';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    __retryCount?: number;
  }
}

declare module 'axios' {
  interface AxiosInstance {
    getTodos(): Promise<AxiosResponse<Todo[]>>;
    addTodo(todo: { title: string; completed: boolean }): Promise<AxiosResponse<Todo>>;
    updateTodo(id: number, todo: Partial<Todo>): Promise<AxiosResponse<Todo>>;
    deleteTodo(id: number): Promise<AxiosResponse<void>>;
  }
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const axiosClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.getTodos = () => {
  return axiosClient.get<Todo[]>('/todos');
};

axiosClient.addTodo = (todo: { title: string; completed: boolean }) => {
  return axiosClient.post<Todo>('/todos', todo);
};

axiosClient.updateTodo = (id: number, todo: Partial<Todo>) => {
  return axiosClient.put<Todo>(`/todos/${id}`, todo);
};

axiosClient.deleteTodo = (id: number) => {
  return axiosClient.delete(`/todos/${id}`);
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('🚀 Request:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    if (response.config.method === 'get') {
      try {
        const cacheKey = `cache_${response.config.url}`;
        await AsyncStorage.setItem(cacheKey, JSON.stringify({
          data: response.data,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error('Caching error:', error);
      }
    }
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config;
    
    if (!config || !config.url || (config.__retryCount || 0) >= MAX_RETRIES) {
      if (!error.response && error.config?.method === 'get') {
        try {
          const cacheKey = `cache_${error.config.url}`;
          const cachedData = await AsyncStorage.getItem(cacheKey);
          
          if (cachedData) {
            const parsed = JSON.parse(cachedData);
            if (Date.now() - parsed.timestamp < 3600000) { 
              return Promise.resolve({ 
                data: parsed.data, 
                status: 200, 
                statusText: 'OK (from cache)',
                headers: {},
                config: error.config,
                fromCache: true
              });
            }
          }
        } catch (cacheError) {
          console.error('Cache retrieval error:', cacheError);
        }
      }
      return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount || 0;
    config.__retryCount += 1;

    await sleep(RETRY_DELAY * config.__retryCount);

    return axiosClient(config);
  }
);

export default axiosClient;