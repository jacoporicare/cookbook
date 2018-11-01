import React from 'react';

import { WarningAlert } from '../components/elements';
import PageHeading from '../components/common/PageHeading';

const HeadingAlert = WarningAlert.withComponent('h3');

export default function NotFoundPage() {
  return (
    <>
      <PageHeading>Nenalezeno</PageHeading>
      <HeadingAlert>Toto není stránka, kterou hledáš.</HeadingAlert>
    </>
  );
}
