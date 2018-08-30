import React from 'react';
import { Link } from 'react-router';

import { PageHeading } from '../common/PageHeading';
import { Icon } from '../common/Icon';
import { Button, SuccessButton } from '../elements/Button';

type Props = {
  title?: string;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
  slug?: string;
};

const LinkButton = Button.withComponent(Link);

export const Header = ({ title, isNew, isSaving, changed, slug }: Props) => (
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
