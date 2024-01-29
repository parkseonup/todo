import {
  useRef,
  KeyboardEvent,
  InputHTMLAttributes,
  useEffect,
  ChangeEvent,
} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onEnter?: (input: HTMLInputElement) => void;
}

export default function TodoInput({ onEnter, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const _onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter') return;
    if (!inputRef.current) return;
    if (inputRef.current.value.length === 0) return;

    onEnter?.(inputRef.current);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    inputRef.current.value = e.target.value;
  };

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  }, []);

  return (
    <input ref={inputRef} onKeyDown={_onEnter} {...props} onChange={onChange} />
  );
}
