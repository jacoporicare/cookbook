import {
  Button,
  CircularProgress,
  colors,
  createStyles,
  Fab,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Save } from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';

import FabContainer from '../common/FabContainer';
import PageHeading from '../common/PageHeading';

type Props = {
  title?: string;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
  slug?: string;
};

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    fabProgress: {
      color: colors.green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
  }),
);

function Header({ title, isNew, isSaving, changed, slug }: Props) {
  const classes = useStyles();

  return (
    <>
      <PageHeading
        buttons={
          <Link as={isNew ? '/' : `/recept/${slug}`} href={isNew ? '/' : `/recept/[slug]`} passHref>
            <Button component="a" variant="outlined">
              Zrušit
            </Button>
          </Link>
        }
      >
        {title || (isNew ? 'Nový recept' : 'Název receptu')}
      </PageHeading>
      <FabContainer>
        <Fab
          aria-label="Uložit"
          color="primary"
          disabled={!title || isSaving || !changed}
          type="submit"
        >
          <Save />
          {isSaving && <CircularProgress className={classes.fabProgress} size={68} />}
        </Fab>
      </FabContainer>
    </>
  );
}

export default Header;
