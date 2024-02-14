import {
  AddItemAction,
  DeletedItemAction,
  GetAllAction,
  UpdateItemAction,
  ToggleCompletedAllAction,
} from '../reducer/useTodoReducer.type';
import { TodoData } from '../types/todo';
import { TodoServiceType } from './TodoService.type';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export default class TodoService implements TodoServiceType {
  baseUrl: string;
  headers = {
    'Content-Type': 'application/json',
  };

  constructor(url: string) {
    this.baseUrl = url;
  }

  private async fetch(
    method: Method,
    options?: {
      url?: string;
      body?: RequestInit['body'];
    }
  ) {
    const requestUrl = options?.url ? this.baseUrl + options.url : this.baseUrl;

    try {
      const response = await fetch(requestUrl, {
        method,
        headers: this.headers,
        body: options?.body,
      });

      return await response.json();
    } catch (error) {
      console.error(error);
      return { type: 'fetchError', payload: error };
    }
  }

  async getAll(): Promise<GetAllAction> {
    return {
      type: 'getAll',
      payload: await this.fetch('GET'),
    };
  }

  async addItem(value: string): Promise<AddItemAction> {
    return {
      type: 'addItem',
      payload: await this.fetch('POST', {
        body: JSON.stringify({ value }),
      }),
    };
  }

  async updateItem(todo: TodoData): Promise<UpdateItemAction> {
    return {
      type: 'updateItem',
      payload: await this.fetch('PATCH', {
        url: `/${todo.id}`,
        body: JSON.stringify(todo),
      }),
    };
  }

  async toggleCompletedAll(
    completed: TodoData['completed']
  ): Promise<ToggleCompletedAllAction> {
    return {
      type: 'toggleCompletedAll',
      payload: await this.fetch('PATCH', {
        body: JSON.stringify({ completed }),
      }),
    };
  }

  async deleteItem(ids: TodoData['id'][]): Promise<DeletedItemAction> {
    const idsParam = ids.join('&');

    return {
      type: 'deleteItem',
      payload: await this.fetch('DELETE', {
        url: `/${idsParam}`,
      }),
    };
  }
}
