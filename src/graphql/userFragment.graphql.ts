import { gql } from '@apollo/client';

export default gql`
  fragment user on User {
    _id
    username
    displayName
    isAdmin
    lastActivity
  }
`;
