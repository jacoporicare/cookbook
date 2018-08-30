import React from 'react';

import { WarningAlert } from '../components/elements/Alert';
import { PageHeading } from '../components/common/PageHeading';

const HeadingAlert = WarningAlert.withComponent('h3');

export const NotFoundPage = () => (
  <>
    <PageHeading>Nenalezeno</PageHeading>
    <HeadingAlert>Toto není stránka, kterou hledáš.</HeadingAlert>
  </>
);
