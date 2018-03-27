import React from 'react';

import './SearchInput.module.css';

class SearchInput extends React.Component {
  render() {
    return <div styleName="search">{this.props.children}</div>;
  }
}

export default SearchInput;
