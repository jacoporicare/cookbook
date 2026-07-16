import { gql } from '@apollo/client';

export default gql`
  mutation CreateImageUpload($contentType: String!) {
    createImageUpload(contentType: $contentType) {
      key
      uploadUrl
    }
  }
`;
