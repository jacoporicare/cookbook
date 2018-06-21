import React, { ChangeEvent } from 'react';

import SearchInput from '../SearchInput/SearchInput';

type Props = {
  onChange: (value: string) => void;
};

class SearchBar extends React.Component<Props> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div className="form-group">
        <SearchInput>
          <input
            type="text"
            className="form-control cb-search"
            placeholder="Filtrovat recepty"
            autoComplete="off"
            onChange={this.handleChange}
          />
        </SearchInput>
      </div>
    );
  }
}

export default SearchBar;
