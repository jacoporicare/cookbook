import { TextField } from '@mui/material';
import React, { useRef, useEffect } from 'react';

export type TitleFields = 'title';

type Props = {
  title?: string;
  onChange: (name: TitleFields, value: string) => void;
};

function Title({ title = '', onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <TextField
      ref={ref}
      error={!title}
      helperText={!title ? 'Název je povinný' : undefined}
      label="Název"
      value={title}
      variant="filled"
      fullWidth
      onChange={e => onChange('title', e.currentTarget.value)}
    />
  );
}

export default Title;
