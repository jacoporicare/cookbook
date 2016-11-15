import React from 'react';
import './SearchBar.scss';

const SearchBar = () => {
  return (
    <form className="navbar-form navbar-left">
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-search fa-fw" />
          </span>
          <input type="text" className="form-control cb-search" placeholder="Hledat" />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
