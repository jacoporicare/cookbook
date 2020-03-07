import { Interpolation, ClassNames } from '@emotion/core';
import React from 'react';

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
          className={cx(
            regular ? 'far' : 'fa',
            `fa-${icon}`,
            { 'fa-spin': Boolean(spin) },
            { 'fa-fw': Boolean(fw) },
            { 'fa-lg': Boolean(lg) },
          )}
          css={cssProps}
          onClick={onClick}
        />
      )}
    </ClassNames>
  );
}

export default Icon;
