import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

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
    <Box
      sx={
        props.overlay
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              zIndex: 1000,
            }
          : undefined
      }
    >
      <Box
        sx={{
          margin: '100px auto',
          width: '50px',
          height: '20px',
          textAlign: 'center',
          fontSize: '10px',
          ...(props.overlay && {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }),
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
}

export default Spinner;
