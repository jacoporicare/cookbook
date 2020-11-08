import styled from '@emotion/styled';
import { Box, Fab, Button } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';

import { theme } from '../../styles/colors';
import RecipeInfo from '../RecipeInfo/RecipeInfo';
import FabContainer from '../common/FabContainer';
import PageHeading from '../common/PageHeading';

type Props = {
  preparationTime: number | null;
  sideDish: string | null;
  slug: string;
  tags: string[] | null;
  title: string;
  isAuthor?: boolean;
  onDeleteShow: () => void;
};

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
            <Button startIcon={<Delete />} variant="outlined" onClick={onDeleteShow}>
              Smazat
            </Button>
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

      {isAuthor && (
        <FabContainer>
          <Link as={`/recept/${slug}/upravit`} href="/recept/[slug]/upravit" passHref>
            <Fab aria-label="Upravit" color="primary" component="a">
              <Edit />
            </Fab>
          </Link>
        </FabContainer>
      )}
    </>
  );
}

export default RecipeHeader;
