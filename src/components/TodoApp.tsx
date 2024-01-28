import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import useTodo from './useTodo';
import { LocalStorageTodoService } from '../services/api/LocalStorageTodoService';
import TodoInput from './TodoInput';
import { TodoData } from '../types/todo';

export default function TodoApp() {
  const {
    todoList,
    add: addTodo,
    modifyValue,
    toggleCompleted,
    toggleCompletedAll,
    remove: removeTodo,
  } = useTodo(LocalStorageTodoService);
  const [editModeId, setEditModeId] = useState<string | null>(null);
  const [filter, setFilter] = useState<keyof typeof filters>('all');

  const filteredTodoList = useMemo(
    () =>
      todoList.filter((todo) => {
        return filter === 'completed'
          ? todo.completed
          : filter === 'active'
          ? !todo.completed
          : true;
      }),
    [todoList, filter]
  );

  const completedTodoIdList = useMemo(
    () => todoList.filter((todo) => todo.completed).map((todo) => todo.id),
    [todoList]
  );

  const activedTodoAmount = todoList.length - completedTodoIdList.length;

  const onEditMode = (e: MouseEvent, id: TodoData['id']) => {
    if (e.detail === 2) setEditModeId(id);
  };

  const onEdit = (e: ChangeEvent<HTMLInputElement>, id: TodoData['id']) => {
    modifyValue(id, e.target.value);
  };

  const onToggleCompletedAll = () => {
    toggleCompletedAll(activedTodoAmount > 0);
  };

  const onClearCompletedTodo = () => {
    removeTodo(completedTodoIdList);
  };

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <TodoInput
          className='new-todo'
          placeholder='What needs to be done?'
          onEnter={(inputValue) => addTodo(inputValue)}
        />
      </header>

      <section className='main'>
        {todoList.length > 0 ? (
          <>
            <input
              id='toggle-all'
              className='toggle-all'
              type='checkbox'
              checked={activedTodoAmount === 0}
              onChange={onToggleCompletedAll}
            />
            <label htmlFor='toggle-all'>Mark all as complete</label>
          </>
        ) : null}

        <ul className='todo-list'>
          {filteredTodoList.map((todo) => (
            <li
              key={todo.id}
              className={`
              ${todo.completed ? 'completed' : ''} 
              ${editModeId === todo.id ? 'editing' : ''}
            `}
              onClick={(e) => onEditMode(e, todo.id)}
            >
              <div className='view'>
                <input
                  className='toggle'
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.id)}
                />
                <label>{todo.value}</label>
                <button
                  type='button'
                  className='destroy'
                  onClick={() => removeTodo([todo.id])}
                ></button>
              </div>
              {editModeId === todo.id ? (
                <TodoInput
                  className='edit'
                  onEnter={(inputValue) => addTodo(inputValue)}
                  onChange={(e) => onEdit(e, todo.id)}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {todoList.length > 0 ? (
        <footer className='footer'>
          <span className='todo-count'>
            {activedTodoAmount} item{activedTodoAmount === 1 ? '' : 's'} left
          </span>

          <ul className='filters'>
            {(Object.keys(filters) as (keyof typeof filters)[]).map((key) => (
              <li key={key}>
                <a
                  href={filters[key].path}
                  className={filter === key ? 'selected' : ''}
                  onClick={() => setFilter(key)}
                >
                  {filters[key].view}
                </a>
              </li>
            ))}
          </ul>

          {completedTodoIdList.length > 0 ? (
            <button className='clear-completed' onClick={onClearCompletedTodo}>
              Clear completed
            </button>
          ) : null}
        </footer>
      ) : null}
    </section>
  );
}

const filters = {
  all: {
    path: '#/',
    view: 'All',
  },
  active: {
    path: '#/active',
    view: 'Active',
  },
  completed: {
    path: '#/completed',
    view: 'Completed',
  },
};
