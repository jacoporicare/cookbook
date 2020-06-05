import gql from 'graphql-tag';

import userFragment from './userFragment.graphql';

export default gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      ...user
    }
  }

  ${userFragment}
`;
