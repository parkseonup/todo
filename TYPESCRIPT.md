# TypeScript

## 객체 순회 타입

```ts
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

export default function TodoFilters({ value, onClick }: Props) {
  return (
    <ul className='filters'>
       {Object.keys(filters).map((filter) => (
        //                       ~~~filter: string. 구조적타이핑 특성으로 Object에 다른 key가 들어올 수 있음을 인지하고 string으로 타입을 추론함.
        <li key={key}>
          <a
            href={filters[filter].path}
            //    ~~~~~~~~~~~~ tsError: No index signature with a parameter of type 'string' was found on type '{ all: { path: string; view: string; }; active: { path: string; view: string; }; completed: { path: string; view: string; }; }'
            className={value === filter ? 'selected' : ''}
            onClick={() => setFilter(filter)}
          >
            {filters[filter].view}
          </a>
        </li>
      ))}
    </ul>;
  );
}
```

### 1. 인덱스 시그니처 활용

```tsx
interface Filters {
  [key: string]: {
    path: string;
    view: string;
  };
}

export const filters: Filters = {
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

export default function TodoFilters({ value, onClick }: Props) {
  return (
    <ul className='filters'>
      {Object.keys(filters).map((filter) => (
        <li key={filter}>
          <a
            href={filters[filter].path}
            className={value === filter ? 'selected' : ''}
            onClick={() => onClick(filter)}
          >
            {filters[filter].view}
          </a>
        </li>
      ))}
    </ul>
  );
}
```

#### 문제점

key를 string으로 타입을 넓히면 key가 포괄적으로 들어올 수 있기 때문에 정확한 타입을 파악하기 힘들다. 객체의 경우, 구조적 타이핑을 허용하기 때문에 예상하지 못한 key 값을 받을 수 있음을 인지해야 한다. 때문에 타입을 좁힐 필요가 있다.

### 2. 타입 단언 활용

```tsx
export default function TodoFilters({ value, onClick }: Props) {
  return (
    <ul className='filters'>
      {(Object.keys(filters) as (keyof typeof filters)[]).map((filter) => (
        //                       ~~~~~~~~~~~~~~~~~~~~~~~ (all | active | completed)[]
        <li key={filter}>
          <a
            href={filters[filter].path}
            className={value === filter ? 'selected' : ''}
            onClick={() => setFilter(filter)}
          >
            {filters[filter].view}
          </a>
        </li>
      ))}
    </ul>
  );
}
```

3. 무공변적 타입 활용

- 참고: https://younho9.dev/how-to-iterate-object-more-safely

## 배열 요소의 타입 추출

인덱스드 엑세스 타입 사용한다.

> 배열 타입의 모든 요소는 전부 동일한 타입을 가지며 배열의 인덱스는 숫자 타입이다.
> 따라서 number로 인덱싱하여 배열 요소를 얻은 다음에 typeof 연산자를 붙여주면 해당 배열 요소의 타입을 가져올 수 있다.
> (출처: 우아한 타입스크립트 with 리액트 101p)

```tsx
// LocalStorageTodoService.ts
deleteItem(ids: TodoData['id'][]): TodoData {

  const targetIndexs: [typeof ids[number], number][] = ids.map((id) => [id, responseTodoList.findIndex((todo) => todo.id === id)]);
  //                   ~~~~~~~~~~~~~~~~~~ 이 부분: 매개변수로 받은 ids 배열 요소의 타입을 넣고 싶었음.
}
```