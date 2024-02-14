import { useMemo, useState } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import { filters } from '../constans/filters';
import TodoFilters from './TodoFilters';
import useTodo from './hooks/useTodo';

export default function TodoApp() {
  const {
    state: { data: todoList },
    addItem,
    updateItem,
    toggleCompletedAll,
    deleteItem,
  } = useTodo();
  const [editModeId, setEditModeId] = useState<string>('');
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

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <TodoInput
          className='new-todo'
          placeholder='What needs to be done?'
          onEnter={(input) => {
            addItem(input.value);
            input.value = '';
            input.focus();
          }}
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
              onChange={() => toggleCompletedAll(activedTodoAmount > 0)}
            />
            <label htmlFor='toggle-all'>Mark all as complete</label>
          </>
        ) : null}

        <ul className='todo-list'>
          {filteredTodoList.map((todo) => (
            <TodoItem
              key={todo.id}
              data={todo}
              isEditing={editModeId === todo.id}
              setEditModeId={setEditModeId}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          ))}
        </ul>
      </section>

      {todoList.length > 0 ? (
        <footer className='footer'>
          <span className='todo-count'>
            {activedTodoAmount} item{activedTodoAmount === 1 ? '' : 's'} left
          </span>

          <TodoFilters value={filter} onClick={(value) => setFilter(value)} />

          {completedTodoIdList.length > 0 ? (
            <button
              className='clear-completed'
              onClick={() => deleteItem(completedTodoIdList)}
            >
              Clear completed
            </button>
          ) : null}
        </footer>
      ) : null}
    </section>
  );
}
