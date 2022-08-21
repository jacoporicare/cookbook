import { gql } from '@apollo/client';

export default gql`
  mutation ResetPassword($id: ID!) {
    resetPassword(id: $id)
  }
`;
