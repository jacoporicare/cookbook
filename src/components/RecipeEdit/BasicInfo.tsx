import {
  Autocomplete,
  Box,
  Chip,
  InputAdornment,
  MenuItem,
  TextField,
  useTheme,
} from '@mui/material';

export type BasicInfoFields = 'preparationTime' | 'servingCount' | 'sideDish';

type Props = {
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  sideDishOptions: string[];
  tagOptions: string[];
  tags?: string[];
  onChange: (name: BasicInfoFields, value: string) => void;
  onTagsChange: (tags: string[]) => void;
};

function BasicInfo({
  preparationTime,
  servingCount,
  sideDish,
  sideDishOptions,
  tagOptions,
  tags,
  onChange,
  onTagsChange,
}: Props) {
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
    <>
      <TextField
        InputProps={{ endAdornment: <InputAdornment position="end">min</InputAdornment> }}
        inputProps={{ min: 1 }}
        label="Doba přípravy"
        type="number"
        value={preparationTime ?? ''}
        variant="filled"
        fullWidth
        onChange={e => onChange('preparationTime', e.currentTarget.value)}
      />

      <Box mt={3}>
        <TextField
          inputProps={{ min: 1 }}
          label="Počet porcí"
          type="number"
          value={servingCount ?? ''}
          variant="filled"
          fullWidth
          onChange={e => onChange('servingCount', e.currentTarget.value)}
        />
      </Box>

      <Box mt={3}>
        <Autocomplete
          options={sideDishOptions}
          renderInput={params => (
            <TextField
              {...params}
              label="Příloha"
              variant="filled"
              onChange={e => onChange('sideDish', e.currentTarget.value)}
            />
          )}
          value={sideDish}
          disableClearable
          freeSolo
          onChange={(_, value) => onChange('sideDish', value)}
        />
      </Box>

      <Box mt={3}>
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
          value={tags ?? []}
          variant="filled"
          fullWidth
          select
          onChange={event => onTagsChange(event.target.value as unknown as string[])}
        >
          {tagOptions.map(tag => (
            <MenuItem key={tag} style={getStyles(tag, tags ?? [])} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </TextField>
        {/* <label htmlFor="tags">Štítky</label>
        <Creatable
          defaultValue={tags?.map(t => ({ value: t, label: t }))}
          formatCreateLabel={input => `Vytvořit "${input}"`}
          inputId="tags"
          noOptionsMessage={() => 'Žádné možnosti'}
          options={tagOptions.map(t => ({ value: t, label: t }))}
          placeholder="Vybrat nebo vytvořit..."
          getv
          isClearable
          isMulti
          onChange={values => onTagsChange(values instanceof Array ? values.map(v => v.value) : [])}
        /> */}
      </Box>
    </>
  );
}

export default BasicInfo;
