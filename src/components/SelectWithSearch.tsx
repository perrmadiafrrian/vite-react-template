import classNames from 'classnames';
import { memo, useEffect, useRef, useState } from 'react';

type SelectItem = {
  id: number | string;
  text: string;
};

const SelectWithSearch = memo(
  ({
    items,
    id,
    name,
    placeholder,
    value,
    promptValue,
    onPromptChange,
    onChange,
    className,
  }: {
    name?: string;
    id?: string;
    placeholder?: string;
    value?: string;
    items: Array<SelectItem>;
    promptValue?: string;
    onPromptChange?: (text: string) => void;
    onChange?: (selected: SelectItem) => void;
    className?: string;
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<SelectItem | undefined>(
      items.find((item) => `${item.id}` === value)
    );
    const [inside, setInside] = useState(false);
    const handleSelect = (item: SelectItem) => {
      setSelected(item);
      onChange && onChange(item);
      setOpen(false);
      if (inputRef.current) {
        inputRef.current.value = `${item.id}`;
      }
    };

    useEffect(() => {
      if (inputRef.current && value) {
        inputRef.current.value = value;
      }
    }, [value]);

    useEffect(() => {
      setSelected(items.find((item) => `${item.id}` === value));
    }, [items, value]);

    return (
      <>
        {!open ? (
          <button
            className={classNames(
              'input text-left',
              'input-bordered',
              'w-full',
              'join-item',
              className
            )}
            onBlur={() => !inside && setOpen(false)}
            onFocus={() => setOpen(true)}
          >
            <span className={classNames({ 'text-base-300': !selected })}>
              {selected ? selected.text : placeholder}
            </span>
          </button>
        ) : (
          <input
            type="text"
            className={classNames(
              { hidden: !open },
              'input input-bordered w-full',
              className
            )}
            value={promptValue}
            autoFocus
            onBlur={() => !inside && setOpen(false)}
            onChange={(e) => onPromptChange && onPromptChange(e.target.value)}
          />
        )}
        <div
          className={classNames('join dropdown dropdown-bottom', {
            'dropdown-open': open && items.length > 0,
          })}
        >
          <input
            ref={inputRef}
            type="hidden"
            className="hidden"
            name={name}
            id={id}
          />
          <ul
            className={`dropdown-content z-[1] menu flex-nowrap p-2 shadow bg-base-100 rounded-box w-full max-h-56 overflow-y-auto overflow-x-hidden`}
            onMouseEnter={() => setInside(true)}
            onMouseLeave={() => setInside(false)}
          >
            {items.map((item) => (
              <li key={item.id}>
                <div onClick={() => handleSelect(item)}>{item.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
);

export default SelectWithSearch;
