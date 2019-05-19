import { RouteComponentProps } from '@reach/router';
import { useEffect } from 'react';
import { clearAuthToken } from '../clientAuth';

type Props = RouteComponentProps;

function LogoutPage(props: Props) {
  useEffect(() => {
    clearAuthToken();

    if (props.navigate && props.location) {
      props.navigate(new URL(location.href).searchParams.get('u') || '/');
    }
  }, []);

  return null;
}

export default LogoutPage;
