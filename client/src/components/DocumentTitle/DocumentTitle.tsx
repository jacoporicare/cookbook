import React from 'react';
import DocumentTitle from 'react-document-title';

type Props = {
  title?: string;
};

export default function DocumentTitleWrapper({ title }: Props) {
  return <DocumentTitle title={title ? `${title} - Žrádelník` : 'Žrádelník'} />;
}
