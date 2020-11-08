import { Box, useTheme } from '@material-ui/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function FabContainer(props: Props) {
  const theme = useTheme();

  return (
    <Box bottom={theme.spacing(3)} position="fixed" right={theme.spacing(3)} zIndex={10}>
      {props.children}
    </Box>
  );
}

export default FabContainer;
