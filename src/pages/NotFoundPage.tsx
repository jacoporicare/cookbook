import { RouteComponentProps } from '@reach/router';
import React from 'react';

import PageHeading from '../components/common/PageHeading';
import { WarningAlert } from '../components/elements';

type Props = RouteComponentProps;

const HeadingAlert = WarningAlert.withComponent('h3');

function NotFoundPage(_props: Props) {
  return (
    <>
      <PageHeading>Nenalezeno</PageHeading>
      <HeadingAlert>Toto není stránka, kterou hledáš.</HeadingAlert>
    </>
  );
}

export default NotFoundPage;
