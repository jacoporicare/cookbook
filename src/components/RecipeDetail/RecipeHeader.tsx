import { Box, Chip, Grid, IconButton, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';

import RecipeInfo from '../RecipeInfo/RecipeInfo';
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
                <IconButton aria-label="Upravit" component="a">
                  <Edit />
                </IconButton>
              </Link>{' '}
              <IconButton aria-label="Smazat" onClick={onDeleteShow}>
                <Delete />
              </IconButton>
            </>
          )
        }
      >
        {title}
      </PageHeading>

      {Boolean(preparationTime || sideDish || tags?.length) && (
        <Box mb={2}>
          <Grid alignItems="center" spacing={1} container>
            {Boolean(preparationTime || sideDish) && (
              <Grid xs={12} item>
                <RecipeInfo preparationTime={preparationTime} sideDish={sideDish} />
              </Grid>
            )}
            {!!tags?.length && (
              <Grid xs={12} item>
                <Grid alignItems="center" justify="flex-end" spacing={2} container>
                  <Grid item>
                    <Typography color="textSecondary" component="span">
                      Štítky
                    </Typography>
                  </Grid>
                  {tags?.map(tag => (
                    <Grid key={tag} item>
                      <Chip color="primary" label={tag} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default RecipeHeader;
