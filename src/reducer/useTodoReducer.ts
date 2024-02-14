import { useReducer } from 'react';
import { Action, TodoReducerState } from './useTodoReducer.type';

export default function useTodoReducer() {
  return useReducer(todoReducer, defaultState);
}

const defaultState: TodoReducerState = {
  status: 'success',
  data: [],
};

function todoReducer(
  state: TodoReducerState,
  action: Action
): TodoReducerState {
  switch (action.type) {
    case 'fetchStart': {
      return { ...state, status: 'pending' };
    }
    case 'fetchEnd': {
      return { ...state, status: 'end' };
    }
    case 'fetchError': {
      return { ...state, status: 'error' };
    }
    case 'getAll': {
      return { ...state, data: action.payload };
    }
    case 'addItem': {
      return { ...state, data: [action.payload, ...state.data] };
    }
    case 'updateItem': {
      return {
        ...state,
        data: state.data.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    }
    case 'toggleCompletedAll': {
      return { ...state, data: action.payload };
    }
    case 'deleteItem': {
      return {
        ...state,
        data: state.data.filter(
          (todo) => !action.payload.deletedIds.includes(todo.id)
        ),
      };
    }
  }
}
