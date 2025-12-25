import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  buttons?: ReactNode;
};

export function PageHeading({ children, buttons }: Props) {
  return (
    <div
      className={`
        mb-6
        sm:mb-8
      `}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl font-light">{children}</h2>
        <div>{buttons}</div>
      </div>
    </div>
  );
}
