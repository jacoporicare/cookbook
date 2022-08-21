import { gql } from '@apollo/client';

import userFragment from './userFragment.graphql';

export default gql`
  mutation UpdateUser($id: ID!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
      ...user
    }
  }

  ${userFragment}
`;
