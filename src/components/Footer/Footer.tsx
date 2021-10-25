import { Box, Grid } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <Grid alignItems="center" container>
      <Grid item xs>
        © {new Date().getFullYear()} · Žrádelník
      </Grid>
      <Grid
        component="a"
        href="https://play.google.com/store/apps/details?id=cz.jakubricar.zradelnik&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
        sx={{ height: '3rem' }}
        item
      >
        <Box
          alt="Nyní na Google Play"
          component="img"
          src="https://play.google.com/intl/en_us/badges/static/images/badges/cs_badge_web_generic.png"
          sx={{ height: '3rem' }}
        />
      </Grid>
    </Grid>
  );
}

export default Footer;
