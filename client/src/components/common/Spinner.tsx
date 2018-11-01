import React from 'react';
import styled, { keyframes } from 'react-emotion';

type Props = {
  delay?: number;
  overlay?: boolean;
};

type State = {
  visible: boolean;
};

const stretchAnimation = keyframes`
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1.0); }`;

const Container = styled.div`
  margin: 100px auto;
  width: 50px;
  height: 20px;
  text-align: center;
  font-size: 10px;
`;

const Rect = styled.div<{ delay: number }>`
  background-color: #333;
  height: 100%;
  width: 6px;
  display: inline-block;
  animation: ${stretchAnimation} 1.2s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;

  ${Container} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default class Spinner extends React.Component<Props, State> {
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
    const OverlayComponent = overlay ? Overlay : 'div';

    return (
      <OverlayComponent>
        <Container>
          <Rect delay={0} /> <Rect delay={-1.1} /> <Rect delay={-1.0} /> <Rect delay={-0.9} />{' '}
          <Rect delay={-0.8} />
        </Container>
      </OverlayComponent>
    );
  }
}