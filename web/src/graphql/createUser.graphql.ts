import { gql } from '@apollo/client';

import userFragment from './userFragment.graphql';

export default gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      ...user
    }
  }

  ${userFragment}
`;
