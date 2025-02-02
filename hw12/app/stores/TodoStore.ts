import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosClient } from '../api/axiosClient';
import { TodoService } from '../services/TodoService';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export class TodoStore {
  todos: Todo[] = [];
  loading: boolean = false;
  addingTodo: boolean = false;
  updatingTodo: boolean = false;
  deletingTodo: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTodos = (todos: Todo[]) => {
    this.todos = todos;
  }

  setError = (error: string | null) => {
    this.error = error;
  }

  private persistTodos = async () => {
    await AsyncStorage.setItem('todos', JSON.stringify(this.todos));
  }

  async fetchTodos() {
    this.loading = true;
    this.error = null;
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    } catch (error) {
      this.error = 'Failed to load todos';
    } finally {
      this.loading = false;
    }
  }

  async addTodo(text: string) {
    this.addingTodo = true;
    this.error = null;
    try {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
      };
      this.todos.push(newTodo);
      await this.persistTodos();
    } catch (error) {
      this.error = 'Failed to add todo';
    } finally {
      this.addingTodo = false;
    }
  }

  async deleteTodo(id: string) {
    this.deletingTodo = true;
    this.error = null;
    try {
      this.todos = this.todos.filter(todo => todo.id !== id);
      await this.persistTodos();
    } catch (error) {
      this.error = 'Failed to delete todo';
    } finally {
      this.deletingTodo = false;
    }
  }

  async toggleTodo(id: string, completed: boolean) {
    this.updatingTodo = true;
    this.error = null;
    try {
      await TodoService.toggleTodo(id, completed);
      this.todos = this.todos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      );
      await this.persistTodos();
    } catch (error) {
      this.error = 'Failed to update todo';
    } finally {
      this.updatingTodo = false;
    }
  }
}

export const todoStore = new TodoStore();