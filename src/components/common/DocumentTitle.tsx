import React from 'react';
import { Helmet } from 'react-helmet';

type Props = {
  title?: string;
};

function DocumentTitle({ title }: Props) {
  return (
    <Helmet>
      <title>{title ? `${title} - Žrádelník` : 'Žrádelník'}</title>
    </Helmet>
  );
}

export default DocumentTitle;
