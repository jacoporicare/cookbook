import gql from 'graphql-tag';

import userFragment from './userFragment.graphql';

export default gql`
  query UserList {
    users {
      ...user
    }
  }

  ${userFragment}
`;
