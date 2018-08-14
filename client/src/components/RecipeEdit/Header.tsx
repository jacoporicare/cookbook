import React from 'react';
import { Link } from 'react-router';

import { Icon } from '../Icon/Icon';

type Props = {
  title?: string;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
  slug?: string;
};

export const Header = ({ title, isNew, isSaving, changed, slug }: Props) => (
  <h1 className="page-header clearfix">
    {title || (isNew ? 'Nový recept' : 'Název receptu')}
    <span className="pull-right">
      <button type="submit" className="btn btn-success" disabled={!title || isSaving || !changed}>
        <Icon icon="save" /> {isSaving ? 'Ukládání…' : 'Uložit'}
      </button>{' '}
      <Link to={isNew ? '/' : `/recept/${slug}`} className="btn btn-default">
        Zrušit
      </Link>
    </span>
  </h1>
);
