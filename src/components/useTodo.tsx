import { useEffect, useState } from 'react';
import { BaseTodoService } from '../services/type/BaseTodoService';
import { TodoData, TodoListData } from '../types/todo';

export default function useTodo(apiService: typeof BaseTodoService) {
  const api = new apiService();
  const [todoList, setTodoList] = useState<TodoListData>([]);

  const _setTodoList = () => {
    setTodoList(api.getAll());
  };

  useEffect(() => {
    _setTodoList();
  }, []);

  return {
    todoList,
    add(newTodoValue: string) {
      api.add(newTodoValue);
      _setTodoList();
    },
    modifyValue(id: TodoData['id'], value: string) {
      api.modifyValue(id, value);
      _setTodoList();
    },
    toggleCompleted(id: TodoData['id']) {
      api.toggleCompleted(id);
      _setTodoList();
    },
    toggleCompletedAll(state: boolean) {
      api.toggleCompletedAll(state);
      _setTodoList();
    },
    remove(ids: TodoData['id'][]) {
      api.remove(ids);
      _setTodoList();
    },
  };
}
