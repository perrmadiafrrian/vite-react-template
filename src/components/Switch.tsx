import { Children, ReactElement, ReactNode, memo } from 'react';

const Switch = memo(
  ({ children, active_name }: { children: ReactNode; active_name: string }) => {
    return Children.map(children, (child) => {
      if ((child as ReactElement).key === active_name) return child;
      else return <></>;
    });
  }
);

export default Switch;
