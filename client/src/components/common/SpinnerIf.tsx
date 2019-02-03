import React from 'react';

import Spinner from '../common/Spinner';

type Props = {
  children: React.ReactNode;
  spinner?: boolean;
};

function SpinnerIf({ children, spinner }: Props) {
  return spinner ? <Spinner /> : <>{children}</>;
}

export default SpinnerIf;
