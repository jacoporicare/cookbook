import { Button } from '@/components/ui/button';

import PageHeading from '../common/PageHeading';

type Props = {
  title?: string;
  isInstantPotNewRecipe: boolean;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
};

function Header({
  title,
  isInstantPotNewRecipe,
  isNew,
  isSaving,
  changed,
}: Props) {
  return (
    <PageHeading
      buttons={
        <Button disabled={!title || isSaving || !changed} type="submit">
          Uložit
        </Button>
      }
    >
      {title ||
        (isInstantPotNewRecipe
          ? 'Nový Instant Pot recept'
          : isNew
            ? 'Nový recept'
            : 'Název chybí')}
    </PageHeading>
  );
}

export default Header;
