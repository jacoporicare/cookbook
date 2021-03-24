import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  appLink: {
    height: '3rem',
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <Grid alignItems="center" container>
      <Grid item xs>
        © {new Date().getFullYear()} · Žrádelník
      </Grid>
      <Grid
        className={classes.appLink}
        component="a"
        href="https://play.google.com/store/apps/details?id=cz.jakubricar.zradelnik&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
        item
      >
        <img
          alt="Nyní na Google Play"
          className={classes.appLink}
          src="https://play.google.com/intl/en_us/badges/static/images/badges/cs_badge_web_generic.png"
        />
      </Grid>
    </Grid>
  );
}

export default Footer;
