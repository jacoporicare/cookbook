import React, { PropTypes } from 'react';

import './App.scss';

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Žrádelník</h1>
        {this.props.children}
      </div>
    );
  }

}

App.propTypes = {
  children: PropTypes.element
};

export default App;
