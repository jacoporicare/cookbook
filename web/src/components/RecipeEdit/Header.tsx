import { Button } from '@mui/material';

import PageHeading from '../common/PageHeading';

type Props = {
  title?: string;
  isInstantPotNewRecipe: boolean;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
};

function Header({ title, isInstantPotNewRecipe, isNew, isSaving, changed }: Props) {
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
      {title ||
        (isInstantPotNewRecipe ? 'Nový Instant Pot recept' : isNew ? 'Nový recept' : 'Název chybí')}
    </PageHeading>
  );
}

export default Header;
