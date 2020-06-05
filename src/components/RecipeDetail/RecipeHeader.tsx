import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

import { theme } from '../../styles/colors';
import RecipeInfo from '../RecipeInfo/RecipeInfo';
import Icon from '../common/Icon';
import PageHeading from '../common/PageHeading';
import { Box } from '../core';
import { Button, DangerButton } from '../elements';

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
            <>
              <Link as={`/recept/${slug}/upravit`} href="/recept/[slug]/upravit" passHref>
                <Button as="a">
                  <Icon icon="edit" regular />
                  Upravit
                </Button>
              </Link>
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
