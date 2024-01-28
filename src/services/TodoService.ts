import { TodoData, TodoListData } from '../types/todo';
import { BaseTodoService } from './type/BaseTodoService';

export class TodoService extends BaseTodoService {
  api: BaseTodoService;

  constructor(private apiService: typeof BaseTodoService) {
    super();
    this.api = new apiService();
  }

  getAll(): TodoListData {
    return this.api.getAll();
  }

  add(newTodoValue: string): TodoData {
    return this.api.add(newTodoValue);
  }

  modifyValue(id: TodoData['id'], value: string): TodoData {
    return this.api.modifyValue(id, value);
  }

  toggleCompleted(id: TodoData['id']): TodoData {
    return this.api.toggleCompleted(id);
  }

  toggleCompletedAll(state: boolean): TodoListData {
    return this.api.toggleCompletedAll(state);
  }

  remove(ids: TodoData['id'][]): TodoListData {
    return this.api.remove(ids);
  }
}
