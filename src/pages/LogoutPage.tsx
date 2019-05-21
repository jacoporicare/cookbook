import { RouteComponentProps } from '@reach/router';
import { useEffect } from 'react';

import { useAuth } from '../AuthContext';

type Props = RouteComponentProps;

function LogoutPage(props: Props) {
  const [, setToken] = useAuth();

  useEffect(() => {
    setToken('');

    if (props.navigate && props.location) {
      props.navigate(new URL(location.href).searchParams.get('u') || '/');
    }
  }, []);

  return null;
}

export default LogoutPage;
