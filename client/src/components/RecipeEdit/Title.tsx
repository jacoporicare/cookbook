import React from 'react';

import { AutosuggestChangeEventHandler } from '../../types';
import { colors } from '../../styles/colors';
import { Box, Text } from '../core';
import { Input } from '../elements';

type Props = {
  title?: string;
  onChange: AutosuggestChangeEventHandler;
};

export default class Title extends React.Component<Props> {
  ref = React.createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.ref.current) {
      this.ref.current.focus();
    }
  }

  render() {
    const { title = '', onChange } = this.props;

    return (
      <Box mb={3}>
        <Input
          innerRef={this.ref}
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Název"
          hasError={!title}
        />
        {!title && <Text color={colors.red}>Název je povinný</Text>}
      </Box>
    );
  }
}
