import React from 'react';
import { Link } from 'react-router';

type Props = {
  title?: string;
  isNew: boolean;
  isSaving: boolean;
  changed: boolean;
  slug?: string;
};

export default function Header({ title, isNew, isSaving, changed, slug }: Props) {
  return (
    <h1 className="page-header clearfix">
      {title || (isNew ? 'Nový recept' : 'Název receptu')}
      <span className="pull-right">
        <button type="submit" className="btn btn-success" disabled={!title || isSaving || !changed}>
          <i className="fa fa-save" /> {isSaving ? 'Ukládání…' : 'Uložit'}
        </button>{' '}
        <Link to={isNew ? '/' : `/recept/${slug}`} className="btn btn-default">
          Zrušit
        </Link>
      </span>
    </h1>
  );
}
