import React from 'react';
import styled from 'react-emotion';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  placeholder?: React.ReactNode;
};

function formatTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours > 0 && minutes === 0) {
    return `${hours} h`;
  }

  if (hours > 0 && minutes > 0) {
    return `${hours} h ${minutes} min`;
  }

  return `${minutes} min`;
}

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Item = styled.li`
  display: inline;
  & + &::before {
    content: ' · ';
  }
`;

export default function RecipeInfo({ preparationTime, sideDish, placeholder }: Props) {
  if (!preparationTime && !sideDish) {
    return placeholder ? <div>{placeholder}</div> : null;
  }

  return (
    <List>
      {preparationTime &&
        preparationTime > 0 && (
          <Item>
            <i className="fa fa-clock-o" /> {formatTime(preparationTime)}
          </Item>
        )}
      {!!sideDish && (
        <Item>
          <i className="fa fa-spoon" /> {sideDish}
        </Item>
      )}
    </List>
  );
}
