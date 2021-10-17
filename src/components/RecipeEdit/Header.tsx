import { Save } from '@mui/icons-material';
import { CircularProgress, colors, Fab } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import FabContainer from '../common/FabContainer';
import PageHeading from '../common/PageHeading';

type Props = {
  title?: string;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
};

const useStyles = makeStyles({
  fabProgress: {
    color: colors.green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
});

function Header({ title, isNew, isSaving, changed }: Props) {
  const classes = useStyles();

  return (
    <>
      <PageHeading>{title || (isNew ? 'Nový recept' : ' receptu')}</PageHeading>
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
