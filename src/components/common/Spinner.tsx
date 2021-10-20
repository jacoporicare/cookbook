import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';

const PREFIX = 'Spinner';

const classes = {
  container: `${PREFIX}-container`,
  overlay: `${PREFIX}-overlay`,
};

const Root = styled('div')({
  [`& .${classes.container}`]: {
    margin: '100px auto',
    width: '50px',
    height: '20px',
    textAlign: 'center',
    fontSize: '10px',
  },
  [`& .${classes.overlay}`]: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1000,

    '& > $container': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
});

type Props = {
  overlay?: boolean;
};

function Spinner(props: Props) {
  const timer = useRef<number>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      timer.current = window.setTimeout(() => setVisible(true), 800);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Root className={props.overlay ? classes.overlay : undefined}>
      <div className={classes.container}>
        <CircularProgress />
      </div>
    </Root>
  );
}

export default Spinner;
