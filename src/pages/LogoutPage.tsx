import { RouteComponentProps } from '@reach/router';
import { useEffect } from 'react';

import { useAuth } from '../AuthContext';

type Props = RouteComponentProps;

function LogoutPage(props: Props) {
  const [, setToken] = useAuth();

  useEffect(() => {
    setToken('');
    props.navigate &&
      props.navigate(
        props.location && props.location.search.startsWith('?u=')
          ? props.location.search.substring(3)
          : '/',
      );
  }, []);

  return null;
}

export default LogoutPage;
