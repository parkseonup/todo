import { useReducer } from 'react';
import { TodoAction } from './useTodoReducer.type';
import { BaseTodoService } from '../services/type/BaseTodoService';
import { TodoListData } from '../types/todo';

let api: BaseTodoService;

// FIXME: fetch는 따로 만들고, fetch 결과값을 dispatch 해야 함.
export default function useTodoReducer(
  apiService: BaseTodoService
): [TodoListData, React.Dispatch<TodoAction>] {
  api = apiService;

  return useReducer(todoReducer, api.getAll());
}

function todoReducer(todoList: TodoListData, action: TodoAction) {
  switch (action.type) {
    case 'ADD_ITEM': {
      api.addItem(action.value);
      return api.getAll();
    }
    case 'EDIT_VALUE': {
      api.EditValue(action.id, action.value);
      return api.getAll();
    }
    case 'TOGGLE_COMPLETED': {
      api.toggleCompleted(action.id);
      return api.getAll();
    }
    case 'TOGGLE_COMPLETED_ALL': {
      api.toggleCompletedAll(action.state);
      return api.getAll();
    }
    case 'DELETED_ITEM': {
      api.deleteItem(action.ids);
      return api.getAll();
    }
  }
}
