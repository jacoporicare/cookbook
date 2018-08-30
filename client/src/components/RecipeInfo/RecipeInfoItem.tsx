import React from 'react';
import styled from 'react-emotion';

type Props = {
  icon: React.ReactNode;
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
    {icon} {children}
  </Item>
);
