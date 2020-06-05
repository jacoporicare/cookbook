import gql from 'graphql-tag';

export default gql`
  mutation ResetPassword($id: ID!) {
    resetPassword(id: $id)
  }
`;
