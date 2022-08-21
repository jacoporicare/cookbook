import { gql } from '@apollo/client';

import userFragment from './userFragment.graphql';

export default gql`
  query UserList {
    users {
      ...user
    }
  }

  ${userFragment}
`;
