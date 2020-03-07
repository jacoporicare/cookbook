import React, { KeyboardEvent, ChangeEventHandler } from 'react';

import Icon from '../common/Icon';
import { Box } from '../core';
import { Input, Button } from '../elements';

type Props = {
  group?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onAdd: () => void;
};

function IngredientGroupForm({ group = '', onChange, onAdd }: Props) {
  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (group) {
        onAdd();
      }
    }
  }

  return (
    <Box display="flex">
      <Input
        flex="auto"
        name="newGroup"
        placeholder="Nová skupina"
        type="text"
        value={group}
        hasAppendAddon
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <Button disabled={!group} type="button" isAppendAddon onClick={onAdd}>
        <Icon icon="plus" /> Přidat
      </Button>
    </Box>
  );
}

export default IngredientGroupForm;
