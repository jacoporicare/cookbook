import React from 'react';

import Spinner from '../Spinner/Spinner';

type Props = {
  level: string;
  text: string;
  spinner?: boolean;
};

const SpinnerAlert = ({ level, text, spinner }: Props) =>
  spinner ? <Spinner /> : <div className={`alert alert-${level}`}>{text}</div>;

export default SpinnerAlert;
