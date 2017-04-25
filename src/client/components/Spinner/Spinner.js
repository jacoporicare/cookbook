import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.scss';

class Spinner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: (props.delay < 1),
    };
  }

  componentDidMount() {
    if (!this.state.visible) {
      this.timer = setTimeout(() => this.setState({ visible: true }), this.props.delay || 50);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    const { overlay } = this.props;

    return (
      <div className={overlay ? 'spinner-overlay' : ''}>
        <div className="spinner">
          <div className="rect1" />{' '}
          <div className="rect2" />{' '}
          <div className="rect3" />{' '}
          <div className="rect4" />{' '}
          <div className="rect5" />
        </div>
      </div>
    );
  }
}

Spinner.propTypes = {
  delay: PropTypes.number,
  overlay: PropTypes.bool,
};

export default Spinner;
