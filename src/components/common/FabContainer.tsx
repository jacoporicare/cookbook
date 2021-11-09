import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
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
