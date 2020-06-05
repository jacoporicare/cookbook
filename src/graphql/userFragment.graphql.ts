import gql from 'graphql-tag';

export default gql`
  fragment user on User {
    _id
    username
    displayName
    isAdmin
    lastActivity
  }
`;
