import { MouseEvent, Dispatch, SetStateAction } from 'react';
import TodoInput from './TodoInput';
import { TodoData } from '../types/todo';
import { TodoAction } from '../reducer/useTodoReducer.type';

interface Props {
  data: TodoData;
  isEditing: boolean;
  setEditModeId: Dispatch<SetStateAction<TodoData['id']>>;
  dispatch: Dispatch<TodoAction>;
}

export default function TodoItem({
  data,
  isEditing,
  setEditModeId,
  dispatch,
}: Props) {
  const onDoubleClick = (e: MouseEvent, id: TodoData['id']) => {
    if (e.detail === 2) setEditModeId(id);
  };

  const onBlur = () => {
    setEditModeId('');
  };

  return (
    <li
      key={data.id}
      className={`
        ${data.completed ? 'completed' : ''} 
        ${isEditing ? 'editing' : ''}
      `}
      onClick={(e) => onDoubleClick(e, data.id)}
      onBlur={onBlur}
    >
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={data.completed}
          onChange={() =>
            dispatch({
              type: 'TOGGLE_COMPLETED',
              id: data.id,
            })
          }
        />
        <label>{data.value}</label>
        <button
          type='button'
          className='destroy'
          onClick={() =>
            dispatch({
              type: 'DELETED_ITEM',
              ids: [data.id],
            })
          }
        ></button>
      </div>

      {isEditing ? (
        <TodoInput
          className='edit'
          defaultValue={data.value}
          onEnter={(input) => {
            dispatch({
              type: 'EDIT_VALUE',
              id: data.id,
              value: input.value,
            });
            setEditModeId('');
          }}
        />
      ) : null}
    </li>
  );
}
