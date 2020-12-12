import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import React from 'react';

type Props = {
  directions?: string;
  onChange: React.ChangeEventHandler;
};

function Directions({ directions = '', onChange }: Props) {
  return (
    <>
      <TextField
        label="Postup"
        name="directions"
        value={directions}
        fullWidth
        multiline
        onChange={onChange}
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
