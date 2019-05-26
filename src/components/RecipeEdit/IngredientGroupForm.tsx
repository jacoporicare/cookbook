import React, { KeyboardEvent, ChangeEventHandler } from 'react';

import { Box } from '../core';
import { Input, Button } from '../elements';
import Icon from '../common/Icon';

type Props = {
  group?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onAdd: () => void;
};

export default class IngredientGroupForm extends React.Component<Props> {
  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (this.props.group) {
        this.props.onAdd();
      }
    }
  };

  render() {
    const { group = '', onChange, onAdd } = this.props;

    return (
      <Box display="flex">
        <Input
          type="text"
          name="newGroup"
          value={group}
          onChange={onChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Nová skupina"
          flex="auto"
          hasAppendAddon
        />
        <Button type="button" onClick={onAdd} disabled={!group} isAppendAddon>
          <Icon icon="plus" /> Přidat
        </Button>
      </Box>
    );
  }
}
