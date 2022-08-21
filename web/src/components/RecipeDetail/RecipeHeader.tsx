import { Edit, Delete } from '@mui/icons-material';
import { Box, Chip, Grid, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import toSlug from 'slug';

import RecipeInfo from '../RecipeInfo/RecipeInfo';
import PageHeading from '../common/PageHeading';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  slug: string;
  tags?: string[];
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
                <IconButton aria-label="Upravit" component="a" size="large">
                  <Edit />
                </IconButton>
              </Link>{' '}
              <IconButton aria-label="Smazat" size="large" onClick={onDeleteShow}>
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
          <Grid alignItems="center" justifyContent="space-between" spacing={1} container>
            <Grid md="auto" xs={12} item>
              {Boolean(preparationTime || sideDish) && (
                <RecipeInfo preparationTime={preparationTime} sideDish={sideDish} />
              )}
            </Grid>
            {!!tags?.length && (
              <Grid md="auto" xs={12} item>
                <Grid alignItems="center" spacing={2} container>
                  <Grid item>
                    <Typography color="textSecondary" component="span">
                      Štítky
                    </Typography>
                  </Grid>
                  {tags?.map(tag => (
                    <Link key={tag} href={`/?stitky=${toSlug(tag)}`} passHref>
                      <Grid component="a" sx={{ textDecoration: 'none' }} item>
                        <Chip color="primary" label={tag} sx={{ cursor: 'pointer' }} />
                      </Grid>
                    </Link>
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
