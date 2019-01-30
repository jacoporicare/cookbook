import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { WarningAlert } from '../components/elements';
import PageHeading from '../components/common/PageHeading';

type Props = RouteComponentProps;

const HeadingAlert = WarningAlert.withComponent('h3');

export default function NotFoundPage(_props: Props) {
  return (
    <>
      <PageHeading>Nenalezeno</PageHeading>
      <HeadingAlert>Toto není stránka, kterou hledáš.</HeadingAlert>
    </>
  );
}
