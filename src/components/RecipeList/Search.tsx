import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';
import React from 'react';

type Props = {
  multipleSelected: boolean;
  selectedTags: string[];
  tagOptions: { value: string; label: string }[];
  onSearch: (tags: string[]) => void;
  onMatchAllChange: (matchAll: boolean) => void;
};

const useStyles = makeStyles({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;

function Search(props: Props) {
  const theme = useTheme();
  const classes = useStyles();

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
        <FormControl fullWidth>
          <InputLabel id="tags-label">Štítky</InputLabel>
          <Select
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                },
              },
            }}
            id="tags"
            input={<Input id="tags-input" fullWidth />}
            labelId="tags-label"
            renderValue={selected => (
              <div className={classes.chips}>
                {(selected as string[]).map(value => (
                  <Chip key={value} className={classes.chip} label={value} />
                ))}
              </div>
            )}
            value={props.selectedTags ?? []}
            multiple
            onChange={event => props.onSearch(event.target.value as string[])}
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
          </Select>
        </FormControl>
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
