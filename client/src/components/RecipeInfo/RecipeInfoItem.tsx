import React from 'react';
import styled from 'react-emotion';

import { Icon } from '../Icon/Icon';

type Props = {
  icon: string;
  children?: React.ReactNode;
};

const Item = styled.li`
  display: inline;
  & + &::before {
    content: ' · ';
  }
`;

export const RecipeInfoItem = ({ icon, children }: Props) => (
  <Item>
    <Icon icon={icon} /> {children}
  </Item>
);
