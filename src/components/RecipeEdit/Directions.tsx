import { Help } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';

export type DirectionsFields = 'directions';

type Props = {
  directions?: string;
  onChange: (name: DirectionsFields, value: string) => void;
};

function Directions({ directions = '', onChange }: Props) {
  return (
    <>
      <TextField
        label="Postup"
        minRows={10}
        value={directions}
        variant="filled"
        fullWidth
        multiline
        onChange={e => onChange('directions', e.currentTarget.value)}
      />
      <Box mt={2} textAlign="right">
        <Typography variant="caption">
          <Button
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            rel="noopener noreferrer"
            size="small"
            startIcon={<Help />}
            target="_blank"
          >
            Návod na Markdown
          </Button>
        </Typography>
      </Box>
    </>
  );
}

export default Directions;
