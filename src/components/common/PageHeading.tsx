import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
  buttons?: React.ReactNode;
};

function PageHeading({ children, buttons }: Props) {
  return (
    <Box mb={[3, 4]}>
      <Grid alignItems="center" justify="space-between" wrap="wrap" container>
        <Grid item>
          <Typography variant="h2">{children}</Typography>
        </Grid>
        <Grid item>{buttons}</Grid>
      </Grid>
    </Box>
  );
}

export default PageHeading;
