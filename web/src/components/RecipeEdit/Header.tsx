import { Button } from '@/components/ui/button';

import { PageHeading } from '../common/PageHeading';

type Props = {
  title?: string;
  isInstantPotNewRecipe: boolean;
  isNew: boolean;
  isSaving: boolean;
};

export function Header({
  title,
  isInstantPotNewRecipe,
  isNew,
  isSaving,
}: Props) {
  return (
    <PageHeading
      buttons={
        <Button disabled={isSaving} type="submit">
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
