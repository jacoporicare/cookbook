import React from 'react';
import { cx } from 'react-emotion';

type Props = {
  icon: string;
  spin?: boolean;
  fw?: boolean;
  lg?: boolean;
  regular?: boolean;
};

function Icon({ icon, spin, fw, lg, regular }: Props) {
  return (
    <i
      className={cx(regular ? 'far' : 'fa', `fa-${icon}`, {
        'fa-spin': spin,
        'fa-fw': fw,
        'fa-lg': lg,
      })}
    />
  );
}

export default Icon;
