import { ReactNode } from 'react';

import { Spinner } from '../common/Spinner';

type Props = {
  children: ReactNode;
  spinner?: boolean;
};

export function SpinnerIf({ children, spinner }: Props) {
  return spinner ? <Spinner /> : <>{children}</>;
}
