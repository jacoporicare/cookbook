import React from 'react';
import ReactDocumentTitle from 'react-document-title';

type Props = {
  title?: string;
};

export const DocumentTitle = ({ title }: Props) => (
  <ReactDocumentTitle title={title ? `${title} - Žrádelník` : 'Žrádelník'} />
);
