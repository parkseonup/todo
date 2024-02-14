import {
  AddItemAction,
  DeletedItemAction,
  GetAllAction,
  ToggleCompletedAllAction,
  UpdateItemAction,
} from '../reducer/useTodoReducer.type';
import { TodoData, TodoListData } from '../types/todo';
import { TodoServiceType } from './TodoService.type';

export class LocalStorageTodoService implements TodoServiceType {
  key: string;

  constructor() {
    this.key = 'TODO';
  }

  private async get(id: TodoData['id']): Promise<TodoData | null> {
    const { payload: todoList } = await this.getAll();
    return todoList.find((item) => item.id === id) ?? null;
  }

  private async set(newList: TodoListData) {
    localStorage.setItem(this.key, JSON.stringify(newList));
  }

  private async has(id: TodoData['id']): Promise<boolean> {
    return !!this.get(id);
  }

  async getAll(): Promise<GetAllAction> {
    const response = localStorage.getItem(this.key);

    return {
      type: 'getAll',
      payload: response ? JSON.parse(response) : [],
    };
  }

  async addItem(newTodoValue: string): Promise<AddItemAction> {
    const id = `${Date.now()}`;
    const { payload: todoList } = await this.getAll();
    const newTodo = {
      id,
      value: newTodoValue,
      completed: false,
    };

    await this.set([newTodo, ...todoList]);

    if (!this.has(id)) throw new Error('addItem 요청에 실패했습니다.');

    return {
      type: 'addItem',
      payload: newTodo,
    };
  }

  async updateItem(todo: TodoData): Promise<UpdateItemAction> {
    const { payload: todoList } = await this.getAll();
    const todoIndex = todoList.findIndex((_todo) => _todo.id === todo.id);

    if (todoIndex < 0) throw new Error('id에 해당하는 todo가 없습니다.');

    todoList[todoIndex] = todo;

    await this.set(todoList);

    if (!this.has(todo.id)) throw new Error('updateItem 요청에 실패했습니다.');

    return {
      type: 'updateItem',
      payload: todoList[todoIndex],
    };
  }

  async toggleCompletedAll(state: boolean): Promise<ToggleCompletedAllAction> {
    const { payload: todoList } = await this.getAll();
    const newTodoList = todoList.map((todo) => ({
      ...todo,
      completed: state,
    }));

    await this.set(newTodoList);

    return {
      type: 'toggleCompletedAll',
      payload: newTodoList,
    };
  }

  async deleteItem(ids: TodoData['id'][]): Promise<DeletedItemAction> {
    const { payload: todoList } = await this.getAll();
    const [newTodoList, deletedIds] = todoList.reduce<
      [TodoListData, TodoData['id'][]]
    >(
      (result, todo) => {
        if (ids.includes(todo.id)) result[1].push(todo.id);
        else result[0].push(todo);

        return result;
      },
      [[], []]
    );

    if (deletedIds.length !== ids.length)
      throw new Error(`id를 찾을 수 없습니다.`);

    await this.set(newTodoList);

    return {
      type: 'deleteItem',
      payload: { deletedIds: deletedIds },
    };
  }
}
