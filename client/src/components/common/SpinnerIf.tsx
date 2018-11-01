import React from 'react';

import Spinner from '../common/Spinner';

type Props = {
  children: React.ReactNode;
  spinner?: boolean;
};

export default function SpinnerIf({ children, spinner }: Props) {
  return spinner ? <Spinner /> : <>{children}</>;
}
