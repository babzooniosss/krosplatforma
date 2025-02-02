import { axiosClient } from '../api/axiosClient';
import { API_CONFIG } from '../constants/api';
import { handleApiError } from '../utils/errorHandler';
import { Alert } from 'react-native';

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export class TodoService {
  static async fetchTodos(): Promise<ITodo[]> {
    try {
      const response = await axiosClient.get(API_CONFIG.ENDPOINTS.TODOS);
      return response.data.slice(0, 10).map((todo: any) => ({
        id: String(todo.id),
        text: todo.title || '',
        completed: todo.completed,
      }));
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async createTodo(text: string): Promise<ITodo> {
    try {
      const response = await axiosClient.post(API_CONFIG.ENDPOINTS.TODOS, {
        title: text,
        completed: false,
      });
      return {
        id: String(response.data.id),
        text: response.data.title || '',
        completed: response.data.completed,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async deleteTodo(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Подтверждение',
        'Вы уверены, что хотите удалить эту задачу?',
        [
          {
            text: 'Нет',
            style: 'cancel',
            onPress: () => resolve()
          },
          {
            text: 'Да',
            style: 'destructive',
            onPress: async () => {
              try {
                await axiosClient.delete(`${API_CONFIG.ENDPOINTS.TODOS}/${id}`);
                resolve();
              } catch (error) {
                reject(handleApiError(error));
              }
            }
          }
        ]
      );
    });
  }

  static async toggleTodo(id: string, completed: boolean): Promise<void> {
    return Promise.resolve();
  }
}