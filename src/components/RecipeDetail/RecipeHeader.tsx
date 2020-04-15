import styled from '@emotion/styled';
import { Link } from '@reach/router';
import React from 'react';

import { theme } from '../../styles/colors';
import RecipeInfo from '../RecipeInfo/RecipeInfo';
import Icon from '../common/Icon';
import PageHeading from '../common/PageHeading';
import { Box } from '../core';
import { Button, DangerButton } from '../elements';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  slug: string;
  tags?: string[];
  title: string;
  isAuthor?: boolean;
  onDeleteShow: () => void;
};

const EditRecipeButton = Button.withComponent(Link);

const Tag = styled.span({
  display: 'inline-block',
  marginRight: '0.5rem',
  padding: '0 0.25rem',
  backgroundColor: theme.primary,
  color: 'white',
  fontSize: '0.75rem',
});

function RecipeHeader({
  preparationTime,
  sideDish,
  slug,
  tags,
  title,
  isAuthor,
  onDeleteShow,
}: Props) {
  return (
    <>
      <PageHeading
        buttons={
          isAuthor && (
            <>
              <EditRecipeButton to={`/recept/${slug}/upravit`}>
                <Icon icon="edit" regular />
                Upravit
              </EditRecipeButton>
              <DangerButton onClick={onDeleteShow}>
                <Icon icon="trash-alt" regular />
                Smazat
              </DangerButton>
            </>
          )
        }
      >
        {title}
      </PageHeading>

      {Boolean(preparationTime || sideDish || tags?.length) && (
        <Box display="flex" mb={3}>
          {Boolean(preparationTime || sideDish) && (
            <Box mr={3}>
              <RecipeInfo preparationTime={preparationTime} sideDish={sideDish} />
            </Box>
          )}
          {!!tags?.length && (
            <Box>
              {tags?.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default RecipeHeader;
