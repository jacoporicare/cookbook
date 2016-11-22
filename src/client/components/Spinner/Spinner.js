import React, { PropTypes } from 'react';
import './Spinner.scss';

class Spinner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: (props.delay < 1)
    };
  }

  componentDidMount() {
    if (!this.state.visible) {
      this.timer = setTimeout(() => this.setState({ visible: true }), this.props.delay || 100);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <div className="spinner">
        <div className="rect1" />{' '}
        <div className="rect2" />{' '}
        <div className="rect3" />{' '}
        <div className="rect4" />{' '}
        <div className="rect5" />
      </div>
    );
  }
}

Spinner.propTypes = {
  delay: PropTypes.number
};

export default Spinner;
