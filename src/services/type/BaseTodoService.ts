import { TodoListData, TodoData } from '../../types/todo';

export class BaseTodoService {
  getAll(): TodoListData {
    throw new Error('getAll 메서드가 정의되지 않았습니다.');
  }

  add(newTodoValue: string): TodoData {
    throw new Error('add 메서드가 정의되지 않았습니다.');
  }

  modifyValue(id: TodoData['id'], value: string): TodoData {
    throw new Error('modifyValue 메서드가 정의되지 않았습니다.');
  }

  toggleCompleted(id: TodoData['id']): TodoData {
    throw new Error('toggleCompleted 메서드가 정의되지 않았습니다.');
  }

  toggleCompletedAll(state: boolean): TodoListData {
    throw new Error('toggleCompletedAll 메서드가 정의되지 않았습니다.');
  }

  remove(ids: TodoData['id'][]): TodoListData {
    throw new Error('remove 메서드가 정의되지 않았습니다.');
  }
}
