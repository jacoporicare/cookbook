import React from 'react';
import Select from 'react-select';

import Checkbox from '../common/Checkbox';
import { Box } from '../core';

type Props = {
  multipleSelected: boolean;
  tagOptions: string[];
  onSearch: (tags: string[]) => void;
  onMatchAllChange: (matchAll: boolean) => void;
};

function Search(props: Props) {
  return (
    <Box display="flex" justifyContent="flex-end" mb={3} mt={[-2, -4]}>
      <Box flex="auto" maxWidth="400px" minWidth="200px">
        <Select
          inputId="tagsearch"
          noOptionsMessage={input => `"${input.inputValue}" nenalezeno`}
          options={props.tagOptions.map(t => ({ value: t, label: t }))}
          placeholder="Hledat podle tagů..."
          isMulti
          onChange={values =>
            props.onSearch(values instanceof Array ? values.map(v => v.value) : [])
          }
        />
      </Box>
      {props.multipleSelected && (
        <Box alignItems="center" display="flex" ml={2}>
          <Checkbox id="matchall" onChange={event => props.onMatchAllChange(event.target.checked)}>
            Pouze všechny
          </Checkbox>
        </Box>
      )}
    </Box>
  );
}

export default Search;
