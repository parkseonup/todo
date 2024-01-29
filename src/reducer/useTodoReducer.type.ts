import { TodoData } from '../types/todo';

interface AddItemAction {
  type: 'ADD_ITEM';
  value: TodoData['value'];
}

interface EditItemAction {
  type: 'EDIT_VALUE';
  id: TodoData['id'];
  value: TodoData['value'];
}

interface ToggleCompletedAction {
  type: 'TOGGLE_COMPLETED';
  id: TodoData['id'];
}

interface ToggleCompletedAllAction {
  type: 'TOGGLE_COMPLETED_ALL';
  state: boolean;
}

interface DeletedItemAction {
  type: 'DELETED_ITEM';
  ids: TodoData['id'][];
}

export type TodoAction =
  | AddItemAction
  | EditItemAction
  | ToggleCompletedAction
  | ToggleCompletedAllAction
  | DeletedItemAction;
