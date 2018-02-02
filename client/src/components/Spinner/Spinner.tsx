import React from 'react';

import './Spinner.module.scss';

interface Props {
  delay?: number;
  overlay?: boolean;
}

interface State {
  visible: boolean;
}

class Spinner extends React.Component<Props, State> {
  timer?: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: props.delay ? props.delay < 1 : true,
    };
  }

  componentDidMount() {
    if (!this.state.visible) {
      this.timer = window.setTimeout(
        () => this.setState({ visible: true }),
        this.props.delay || 50,
      );
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    const { overlay } = this.props;

    return (
      <div styleName={overlay ? 'overlay' : ''}>
        <div styleName="spinner">
          <div styleName="rect" /> <div styleName="rect rect2" /> <div styleName="rect rect3" />{' '}
          <div styleName="rect rect4" /> <div styleName="rect rect5" />
        </div>
      </div>
    );
  }
}

export default Spinner;
