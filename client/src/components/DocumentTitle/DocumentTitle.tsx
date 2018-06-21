import React from 'react';
import DocumentTitle from 'react-document-title';

type Props = {
  title?: string;
};

const DocumentTitleWrapper = ({ title }: Props) => (
  <DocumentTitle title={title ? `${title} - Žrádelník` : 'Žrádelník'} />
);

export default DocumentTitleWrapper;
