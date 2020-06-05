import Link from 'next/link';
import React from 'react';

import Icon from '../common/Icon';
import PageHeading from '../common/PageHeading';
import { Button, SuccessButton } from '../elements';

type Props = {
  title?: string;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
  slug?: string;
};

function Header({ title, isNew, isSaving, changed, slug }: Props) {
  return (
    <PageHeading
      buttons={
        <>
          <SuccessButton disabled={!title || isSaving || !changed}>
            <Icon icon="save" regular />
            {isSaving ? 'Ukládání…' : 'Uložit'}
          </SuccessButton>
          <Link as={isNew ? '/' : `/recept/${slug}`} href={isNew ? '/' : `/recept/[slug]`} passHref>
            <Button as="a">Zrušit</Button>
          </Link>
        </>
      }
    >
      {title || (isNew ? 'Nový recept' : 'Název receptu')}
    </PageHeading>
  );
}

export default Header;
