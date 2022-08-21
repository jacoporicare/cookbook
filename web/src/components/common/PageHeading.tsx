import { Box, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  buttons?: ReactNode;
};

function PageHeading({ children, buttons }: Props) {
  return (
    <Box mb={[3, 4]}>
      <Grid alignItems="center" justifyContent="space-between" wrap="wrap" container>
        <Grid item>
          <Typography variant="h2">{children}</Typography>
        </Grid>
        <Grid item>{buttons}</Grid>
      </Grid>
    </Box>
  );
}

export default PageHeading;
