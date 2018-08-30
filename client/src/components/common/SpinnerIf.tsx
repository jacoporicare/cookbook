import React from 'react';

import { Spinner } from '../common/Spinner';

type Props = {
  children: React.ReactNode;
  spinner?: boolean;
};

export const SpinnerIf = ({ children, spinner }: Props) =>
  spinner ? <Spinner /> : <>{children}</>;
