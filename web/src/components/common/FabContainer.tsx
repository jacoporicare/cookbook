import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function FabContainer(props: Props) {
  return (
    <div
      className={`
        fixed right-2 bottom-6 z-10 px-4
        lg:px-8
        xl:px-12
        2xl:px-16
      `}
    >
      {props.children}
    </div>
  );
}
