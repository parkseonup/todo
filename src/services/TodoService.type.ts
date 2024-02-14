import {
  AddItemAction,
  DeletedItemAction,
  GetAllAction,
  ToggleCompletedAllAction,
  UpdateItemAction,
} from '../reducer/useTodoReducer.type';
import { TodoData } from '../types/todo';

export interface TodoServiceType {
  getAll: () => Promise<GetAllAction>;
  addItem: (value: string) => Promise<AddItemAction>;
  updateItem: (todo: TodoData) => Promise<UpdateItemAction>;
  toggleCompletedAll: (
    completed: TodoData['completed']
  ) => Promise<ToggleCompletedAllAction>;
  deleteItem: (ids: TodoData['id'][]) => Promise<DeletedItemAction>;
}
