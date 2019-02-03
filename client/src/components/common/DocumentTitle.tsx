import React from 'react';
import ReactDocumentTitle from 'react-document-title';

type Props = {
  title?: string;
};

function DocumentTitle({ title }: Props) {
  return <ReactDocumentTitle title={title ? `${title} - Žrádelník` : 'Žrádelník'} />;
}

export default DocumentTitle;
