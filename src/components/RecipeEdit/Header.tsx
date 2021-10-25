import { Save } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import React from 'react';

import PageHeading from '../common/PageHeading';

type Props = {
  title?: string;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
};

function Header({ title, isNew, isSaving, changed }: Props) {
  return (
    <PageHeading
      buttons={
        <IconButton
          aria-label="Uložit"
          disabled={!title || isSaving || !changed}
          size="large"
          type="submit"
        >
          {isSaving ? <CircularProgress size={24} /> : <Save />}
        </IconButton>
      }
    >
      {title || (isNew ? 'Nový recept' : 'Název chybí')}
    </PageHeading>
  );
}

export default Header;
