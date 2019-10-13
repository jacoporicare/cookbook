import React from 'react';
import { Interpolation, ClassNames } from '@emotion/core';

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
    <ClassNames>
      {({ cx }) => (
        <i
          css={cssProps}
          className={cx(
            regular ? 'far' : 'fa',
            `fa-${icon}`,
            { 'fa-spin': Boolean(spin) },
            { 'fa-fw': Boolean(fw) },
            { 'fa-lg': Boolean(lg) },
          )}
          onClick={onClick}
        />
      )}
    </ClassNames>
  );
}

export default Icon;
