import { useEffect } from 'react';
import useTodoReducer from '../../reducer/useTodoReducer';
import { TodoAction } from '../../reducer/useTodoReducer.type';
import TodoService from '../../services/TodoService';
import { TodoData } from '../../types/todo';
// import { LocalStorageTodoService } from '../../services/LocalStorageTodoService';

export default function useTodo() {
  const todoService = new TodoService('http://localhost:5173');
  // const todoService = new LocalStorageTodoService();
  const [state, dispatch] = useTodoReducer();

  const _dispatch = (state: TodoAction) => {
    dispatch({ type: 'fetchStart' });
    dispatch(state);
    dispatch({ type: 'fetchEnd' });
  };

  const getAll = async () => {
    _dispatch(await todoService.getAll());
  };

  const addItem = async (value: string) => {
    _dispatch(await todoService.addItem(value));
  };

  const updateItem = async (todo: TodoData) => {
    _dispatch(await todoService.updateItem(todo));
  };

  const toggleCompletedAll = async (completed: TodoData['completed']) => {
    _dispatch(await todoService.toggleCompletedAll(completed));
  };

  const deleteItem = async (ids: TodoData['id'][]) => {
    _dispatch(await todoService.deleteItem(ids));
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    state,
    addItem,
    updateItem,
    toggleCompletedAll,
    deleteItem,
  };
}
