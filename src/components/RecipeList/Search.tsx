import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  MenuItem,
  TextField,
  useTheme,
} from '@mui/material';
import React from 'react';

type Props = {
  multipleSelected: boolean;
  selectedTags: string[];
  tagOptions: { value: string; label: string }[];
  onSearch: (tags: string[]) => void;
  onMatchAllChange: (matchAll: boolean) => void;
};

function Search(props: Props) {
  const theme = useTheme();

  function getStyles(tag: string, tags: string[]) {
    return {
      fontWeight:
        tags.indexOf(tag) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <Box display="flex" justifyContent="flex-end" mb={3} mt={[-2, -4]}>
      <Box flex="auto" maxWidth="400px" minWidth="200px">
        <TextField
          SelectProps={{
            renderValue: selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map(value => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            ),
            multiple: true,
          }}
          id="tags"
          label="Štítky"
          value={props.selectedTags ?? []}
          variant="filled"
          fullWidth
          select
          onChange={event => props.onSearch(event.target.value as unknown as string[])}
        >
          {props.tagOptions.map(tag => (
            <MenuItem
              key={tag.value}
              style={getStyles(tag.value, props.selectedTags ?? [])}
              value={tag.value}
            >
              {tag.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {props.multipleSelected && (
        <Box alignItems="center" display="flex" ml={2}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={event => props.onMatchAllChange(event.target.checked)}
              />
            }
            label="Pouze všechny"
          />
        </Box>
      )}
    </Box>
  );
}

export default Search;
