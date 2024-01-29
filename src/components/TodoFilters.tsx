import { filters } from '../constans/filters';

interface Props {
  value: keyof typeof filters;
  onClick: (value: Props['value']) => void;
}

export default function TodoFilters({ value, onClick }: Props) {
  return (
    <ul className='filters'>
      {(Object.keys(filters) as (keyof typeof filters)[]).map((filter) => (
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
