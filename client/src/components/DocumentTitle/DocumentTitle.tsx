import React from 'react';
import DocumentTitle from 'react-document-title';

interface Props {
  title?: string;
}

const DocumentTitleWrapper = ({ title }: Props) => (
  <DocumentTitle title={title ? `${title} - Žrádelník` : 'Žrádelník'} />
);

export default DocumentTitleWrapper;
