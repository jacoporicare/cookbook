import { Link } from '@reach/router';
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

const LinkButton = Button.withComponent(Link);

function Header({ title, isNew, isSaving, changed, slug }: Props) {
  return (
    <PageHeading
      buttons={
        <>
          <SuccessButton disabled={!title || isSaving || !changed}>
            <Icon icon="save" regular />
            {isSaving ? 'Ukládání…' : 'Uložit'}
          </SuccessButton>
          <LinkButton to={isNew ? '/' : `/recept/${slug}`}>Zrušit</LinkButton>
        </>
      }
    >
      {title || (isNew ? 'Nový recept' : 'Název receptu')}
    </PageHeading>
  );
}

export default Header;
