import React from 'react';
import { cx } from 'react-emotion';

type Props = {
  icon: string;
  spin?: boolean;
  fw?: boolean;
  lg?: boolean;
};

export const Icon = ({ icon, spin, fw, lg }: Props) => (
  <i
    className={cx('fa', `fa-${icon}`, {
      'fa-spin': spin,
      'fa-fw': fw,
      'fa-lg': lg,
    })}
  />
);
