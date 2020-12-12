import { CircularProgress, colors, Fab, makeStyles, Zoom } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import React from 'react';

import useHideOnScroll from '../../hooks/useHideOnScroll';
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
  const fabHidden = useHideOnScroll();

  return (
    <>
      <PageHeading>{title || (isNew ? 'Nový recept' : ' receptu')}</PageHeading>
      <FabContainer>
        <Zoom in={!fabHidden}>
          <Fab
            aria-label="Uložit"
            color="primary"
            disabled={!title || isSaving || !changed}
            type="submit"
          >
            <Save />
            {isSaving && <CircularProgress className={classes.fabProgress} size={68} />}
          </Fab>
        </Zoom>
      </FabContainer>
    </>
  );
}

export default Header;
