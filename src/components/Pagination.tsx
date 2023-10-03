import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, memo, useMemo } from 'react';
import { Merge } from 'type-fest';

type PaginationProps = Merge<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {
    total_page: number;
    current_page: number;
    onChange: (page: number) => void;
  }
>;

const Pagination = memo(
  ({
    total_page,
    current_page,
    onChange,
    className,
    children: _,
    ...props
  }: PaginationProps) => {
    const pages = useMemo(() => {
      const max_button = 5;
      const half_max_button = Math.floor(max_button / 2);
      const pagination = [];

      if (total_page <= max_button) {
        // If total_page is less than or equal to max_button, display all pages.
        for (let i = 1; i <= total_page; i++) {
          pagination.push(i);
        }
      } else if (current_page <= half_max_button) {
        // If current_page is in the first half, show first max_button pages.
        for (let i = 1; i <= max_button; i++) {
          pagination.push(i);
        }
      } else if (current_page >= total_page - half_max_button) {
        // If current_page is in the last half, show last max_button pages.
        for (let i = total_page - max_button + 1; i <= total_page; i++) {
          pagination.push(i);
        }
      } else {
        // If current_page is in the middle, show current_page and two pages on each side.
        for (
          let i = current_page - half_max_button;
          i <= current_page + half_max_button;
          i++
        ) {
          pagination.push(i);
        }
      }

      return pagination;
    }, [current_page, total_page]);

    return (
      <div className={classNames('join', className)} {...props}>
        <button
          disabled={current_page <= 1}
          onClick={() => onChange(Math.max(1, current_page - 1))}
          className="join-item btn btn-sm"
        >
          «
        </button>
        {pages.map((val) => (
          <button
            disabled={current_page === val}
            onClick={() => onChange(val)}
            className={classNames('join-item btn btn-sm', {
              'btn-active': val === current_page,
            })}
            key={val}
          >
            {val}
          </button>
        ))}
        <button
          disabled={current_page >= total_page}
          onClick={() => onChange(Math.min(total_page, current_page + 1))}
          className="join-item btn btn-sm"
        >
          »
        </button>
      </div>
    );
  }
);

export default Pagination;
