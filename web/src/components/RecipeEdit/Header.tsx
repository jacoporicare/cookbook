import { Button } from '@/components/ui/button';

import { PageHeading } from '../common/PageHeading';

type Props = {
  title?: string;
  isNew: boolean;
  isSaving: boolean;
};

export function Header({ title, isNew, isSaving }: Props) {
  return (
    <PageHeading
      buttons={
        <Button disabled={isSaving} type="submit">
          Uložit
        </Button>
      }
    >
      {title || (isNew ? 'Nový recept' : 'Název chybí')}
    </PageHeading>
  );
}
