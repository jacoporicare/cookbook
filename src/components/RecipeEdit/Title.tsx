import { TextField } from '@material-ui/core';
import React, { useRef, useEffect } from 'react';

type Props = {
  title?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
      name="title"
      value={title}
      fullWidth
      onChange={onChange}
    />
  );
}

export default Title;
