import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  handleChange = event => {
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
