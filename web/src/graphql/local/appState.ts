import { gql } from '@apollo/client';

export default gql`
  query AppState {
    appState @client {
      supportsWebP
    }
  }
`;
