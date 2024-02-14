import { TodoData, TodoListData } from '../types/todo';

export interface FetchStartAction {
  type: 'fetchStart';
}

export interface FetchEndAction {
  type: 'fetchEnd';
}

export interface FetchErrorAction {
  type: 'fetchError';
  payload: Error;
}

export type FetchAction = FetchStartAction | FetchEndAction | FetchErrorAction;

export interface GetAllAction {
  type: 'getAll';
  payload: TodoListData;
}

export interface AddItemAction {
  type: 'addItem';
  payload: TodoData;
}

export interface UpdateItemAction {
  type: 'updateItem';
  payload: TodoData;
}

export interface ToggleCompletedAllAction {
  type: 'toggleCompletedAll';
  payload: TodoListData;
}

export interface DeletedItemAction {
  type: 'deleteItem';
  payload: { deletedIds: TodoData['id'][] };
}

export type TodoAction =
  | GetAllAction
  | AddItemAction
  | UpdateItemAction
  | ToggleCompletedAllAction
  | DeletedItemAction;

export type Action = TodoAction | FetchAction;

export interface TodoReducerState {
  status: 'pending' | 'success' | 'error' | 'end';
  data: TodoListData;
}
