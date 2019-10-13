import React from 'react';
import styled from '@emotion/styled';

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

function RecipeInfoItem({ icon, children }: Props) {
  return (
    <Item>
      {icon} {children}
    </Item>
  );
}

export default RecipeInfoItem;
