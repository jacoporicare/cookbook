import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  delay?: number;
  overlay?: boolean;
};

const Container = styled.div<{ hasOverlay?: boolean }>(props => [
  {
    margin: '100px auto',
    width: '50px',
    height: '20px',
    textAlign: 'center',
    fontSize: '10px',
  },

  props.hasOverlay && {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
]);

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

function Spinner(props: Props) {
  const timer = useRef<number>();
  const [visible, setVisible] = useState(props.delay ? props.delay < 1 : true);

  useEffect(() => {
    if (!visible) {
      timer.current = window.setTimeout(() => setVisible(true), props.delay || 50);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [props.delay, visible]);

  if (!visible) {
    return null;
  }

  const { overlay } = props;
  const OverlayComponent = overlay ? Overlay : 'div';

  return (
    <OverlayComponent>
      <Container hasOverlay={overlay}>
        <CircularProgress />
      </Container>
    </OverlayComponent>
  );
}

export default Spinner;
