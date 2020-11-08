import { gql } from '@apollo/client';

export default gql`
  mutation ChangePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword)
  }
`;
