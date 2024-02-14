import { http, HttpResponse } from 'msw';
import { TodoData, TodoListData } from '../types/todo';

let todoList = [
  {
    id: '1706700516696',
    value: 'test',
    completed: true,
  },
];

export const handlers = [
  // getAll
  http.get('/', () => {
    return HttpResponse.json(todoList);
  }),
  // addItem
  http.post('/', async ({ request }) => {
    const body = await request.json();
    console.log(body);

    if (!body || typeof body !== 'object' || !('value' in body))
      throw new Error('request body가 올바르지 않습니다.');

    const newTodo = {
      id: `${Date.now()}`,
      value: body.value,
      completed: false,
    };
    todoList = [newTodo, ...todoList];

    return HttpResponse.json(newTodo);
  }),
  // toggleCompletedAll
  http.patch('/', async ({ request }) => {
    const body = await request.json();

    if (!body || typeof body !== 'object' || !('completed' in body))
      throw new Error('request body가 올바르지 않습니다.');

    const newTodoList = todoList.map((todo) => ({
      ...todo,
      completed: body.completed,
    }));

    todoList = newTodoList;
    return HttpResponse.json(newTodoList);
  }),
  // updateItem
  http.patch('/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();

    if (
      !body ||
      typeof body !== 'object' ||
      !('id' in body) ||
      !('complete' in body || 'value' in body)
    )
      throw new Error('request body가 올바르지 않습니다.');

    const todoIndex = todoList.findIndex((todo) => todo.id === id);
    const newTodo = {
      ...todoList[todoIndex],
      ...body,
    };

    todoList.splice(todoIndex, 1, newTodo);

    return HttpResponse.json(newTodo);
  }),
  // deleteItem
  http.delete('/:ids', ({ params }) => {
    const ids = (params.ids as string).split('&');
    const [newTodoList, deletedIds] = todoList.reduce<
      [TodoListData, TodoData['id'][]]
    >(
      (result, todo) => {
        if (ids.includes(todo.id)) result[1].push(todo.id);
        else result[0].push(todo);

        return result;
      },
      [[], []]
    );

    todoList = newTodoList;
    return HttpResponse.json({ deletedIds: deletedIds });
  }),
];
