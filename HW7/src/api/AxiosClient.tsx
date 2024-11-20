import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

export default class AxiosClient {
    private api: AxiosInstance;
    static readonly SUCCESS_STATUSES = [200, 201];
    static readonly SERVER_ERROR = 500;

    constructor(config?: AxiosRequestConfig) {
        this.api = axios.create(config);
        this.api.defaults.baseURL = this.getDefaultBaseUrl();
        this.api.defaults.headers.common['App-Platform'] = Platform.OS;
        this.api.defaults.headers.common['Content-Type'] = 'application/json';
    }

    private getDefaultBaseUrl(): string {
        return 'https://jsonplaceholder.typicode.com';
    }

    get = (url: string, config?: AxiosRequestConfig) => {
        return this.api.get(url, config);
    };

    post = (url: string, data: any, config?: AxiosRequestConfig) => {
        return this.api.post(url, data, config);
    };

    put = (url: string, data: any, config?: AxiosRequestConfig) => {
        return this.api.put(url, data, config);
    };

    delete = (url: string, config?: AxiosRequestConfig) => {
        return this.api.delete(url, config);
    };
}