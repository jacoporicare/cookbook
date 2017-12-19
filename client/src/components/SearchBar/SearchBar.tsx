import React, { ChangeEvent } from 'react';

interface Props {
  onChange: (value: string) => void;
}

class SearchBar extends React.Component<Props> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-search fa-fw" />
          </span>
          <input
            type="text"
            className="form-control cb-search"
            placeholder="Hledat"
            autoComplete="off"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
