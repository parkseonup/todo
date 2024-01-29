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

  addItem(newTodoValue: string): TodoData {
    return this.api.addItem(newTodoValue);
  }

  EditValue(id: TodoData['id'], value: string): TodoData {
    return this.api.EditValue(id, value);
  }

  toggleCompleted(id: TodoData['id']): TodoData {
    return this.api.toggleCompleted(id);
  }

  toggleCompletedAll(state: boolean): TodoListData {
    return this.api.toggleCompletedAll(state);
  }

  deleteItem(ids: TodoData['id'][]): TodoListData {
    return this.api.deleteItem(ids);
  }
}
