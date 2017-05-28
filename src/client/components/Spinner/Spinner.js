import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.module.css';

class Spinner extends React.Component {
  static propTypes = {
    delay: PropTypes.number,
    overlay: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.delay < 1,
    };
  }

  componentDidMount() {
    if (!this.state.visible) {
      this.timer = setTimeout(
        () => this.setState({ visible: true }),
        this.props.delay || 50,
      );
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
      <div styleName={overlay ? 'overlay' : ''}>
        <div styleName="spinner">
          <div styleName="rect" />{' '}
          <div styleName="rect rect2" />{' '}
          <div styleName="rect rect3" />{' '}
          <div styleName="rect rect4" />{' '}
          <div styleName="rect rect5" />
        </div>
      </div>
    );
  }
}

export default Spinner;
