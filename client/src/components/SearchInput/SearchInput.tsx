import React from 'react';
import styled from 'react-emotion';

import icon from './search.svg';

const Search = styled('div')`
  .form-control {
    background-image: url('${icon}');
    background-repeat: no-repeat;
    background-position: 8px -5px;
    padding-left: 32px;
  }
`;

export default function SearchInput({ children }: { children?: React.ReactNode }) {
  return <Search>{children}</Search>;
}
