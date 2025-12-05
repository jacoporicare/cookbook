import { Grid } from '@mui/material';

function Footer() {
  return (
    <Grid alignItems="center" container>
      <Grid item xs>
        © {new Date().getFullYear()} · Žrádelník
      </Grid>
    </Grid>
  );
}

export default Footer;
