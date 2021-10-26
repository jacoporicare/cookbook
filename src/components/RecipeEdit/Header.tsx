import { Button } from '@mui/material';
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
        <Button
          color="primary"
          disabled={!title || isSaving || !changed}
          type="submit"
          variant="contained"
        >
          Uložit
        </Button>
      }
    >
      {title || (isNew ? 'Nový recept' : 'Název chybí')}
    </PageHeading>
  );
}

export default Header;
