import React from 'react';

import Spinner from '../Spinner/Spinner';

type Props = {
  level: string;
  text: string;
  spinner?: boolean;
};

export default function SpinnerAlert({ level, text, spinner }: Props) {
  return spinner ? <Spinner /> : <div className={`alert alert-${level}`}>{text}</div>;
}
