import { TodoData, TodoListData } from '../../types/todo';
import { BaseTodoService } from '../type/BaseTodoService';

export class LocalStorageTodoService extends BaseTodoService {
  key: string;

  constructor() {
    super();

    this.key = 'TODO';
  }

  private get(id: TodoData['id']): TodoData | null {
    return this.getAll().find((item) => item.id === id) ?? null;
  }

  private set(newList: TodoListData) {
    localStorage.setItem(this.key, JSON.stringify(newList));
  }

  private has(id: TodoData['id']): boolean {
    return !!this.get(id);
  }

  getAll(): TodoListData {
    const response = localStorage.getItem(this.key);

    return response ? JSON.parse(response) : [];
  }

  addItem(newTodoValue: string): TodoData {
    const id = `${Date.now()}`;
    const responseTodoList = this.getAll();
    const newTodo = {
      id,
      value: newTodoValue,
      completed: false,
    };

    this.set([newTodo, ...responseTodoList]);

    if (!this.has(id)) throw new Error('add 요청에 실패했습니다.');

    return newTodo;
  }

  EditValue(id: TodoData['id'], value: string): TodoData {
    const responseTodoList = this.getAll();
    const todoIndex = responseTodoList.findIndex((todo) => todo.id === id);

    if (todoIndex < 0)
      throw new Error(
        'id에 해당하는 todo가 없으므로, toggleCompleted를 수행할 수 없습니다.'
      );

    responseTodoList[todoIndex].value = value;

    this.set(responseTodoList);

    if (!this.has(id)) throw new Error('EditValue 요청에 실패했습니다.');

    return responseTodoList[todoIndex];
  }

  toggleCompleted(id: TodoData['id']): TodoData {
    const responseTodoList = this.getAll();
    const todoIndex = responseTodoList.findIndex((todo) => todo.id === id);

    if (todoIndex < 0)
      throw new Error(
        'id에 해당하는 todo가 없으므로, toggleCompleted를 수행할 수 없습니다.'
      );

    responseTodoList[todoIndex].completed =
      !responseTodoList[todoIndex].completed;

    this.set(responseTodoList);

    if (!this.has(id)) throw new Error('toggleCompleted 요청에 실패했습니다.');

    return responseTodoList[todoIndex];
  }

  toggleCompletedAll(state: boolean): TodoListData {
    const responseTodoList = this.getAll();
    const newTodoList = responseTodoList.map((todo) => ({
      ...todo,
      completed: state,
    }));

    this.set(newTodoList);

    return newTodoList;
  }

  deleteItem(ids: TodoData['id'][]): TodoListData {
    const responseTodoList = this.getAll();
    const [newTodoList, removedTodoList] = responseTodoList.reduce<
      [TodoListData, TodoListData]
    >(
      (result, todo) => {
        if (ids.includes(todo.id)) result[1].push(todo);
        else result[0].push(todo);

        return result;
      },
      [[], []]
    );

    if (removedTodoList.length !== ids.length)
      throw new Error(`id를 찾을 수 없으므로 remove를 수행할 수 없습니다.`);

    this.set(newTodoList);

    return removedTodoList;
  }
}
