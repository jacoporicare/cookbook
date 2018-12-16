import React from 'react';
import styled from 'react-emotion';

type Props = {
  icon: React.ReactNode;
  children?: React.ReactNode;
};

const Item = styled('li')`
  display: inline;
  & + &::before {
    content: ' · ';
  }
`;

export default function RecipeInfoItem({ icon, children }: Props) {
  return (
    <Item>
      {icon} {children}
    </Item>
  );
}
