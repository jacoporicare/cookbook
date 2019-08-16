import React from 'react';
import { cx, css } from 'react-emotion';
import { Interpolation } from 'emotion';

type Props = {
  icon: string;
  spin?: boolean;
  fw?: boolean;
  lg?: boolean;
  regular?: boolean;
  css?: Interpolation;
  onClick?: (event: React.MouseEvent) => void;
};

function Icon({ icon, spin, fw, lg, regular, css: cssProps, onClick }: Props) {
  return (
    <i
      className={cx(regular ? 'far' : 'fa', `fa-${icon}`, css(cssProps), {
        'fa-spin': spin,
        'fa-fw': fw,
        'fa-lg': lg,
      })}
      onClick={onClick}
    />
  );
}

export default Icon;
