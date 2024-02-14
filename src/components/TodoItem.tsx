import { MouseEvent, Dispatch, SetStateAction } from 'react';
import TodoInput from './TodoInput';
import { TodoData } from '../types/todo';

interface Props {
  data: TodoData;
  isEditing: boolean;
  setEditModeId: Dispatch<SetStateAction<TodoData['id']>>;
  updateItem: (todo: TodoData) => void;
  deleteItem: (ids: TodoData['id'][]) => void;
}

export default function TodoItem({
  data,
  isEditing,
  setEditModeId,
  updateItem,
  deleteItem,
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
          onChange={() => updateItem({ ...data, completed: !data.completed })}
        />
        <label>{data.value}</label>
        <button
          type='button'
          className='destroy'
          onClick={() => deleteItem([data.id])}
        ></button>
      </div>

      {isEditing ? (
        <TodoInput
          className='edit'
          defaultValue={data.value}
          onEnter={(input) => {
            updateItem({ ...data, value: input.value });
            setEditModeId('');
          }}
        />
      ) : null}
    </li>
  );
}
