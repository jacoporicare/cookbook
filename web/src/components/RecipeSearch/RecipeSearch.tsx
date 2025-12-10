import {
  Alert,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import { useCombobox } from 'downshift';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';

import { RecipeBaseFragment } from '../../generated/graphql';
import { colors } from '../../styles/colors';
import RecipeInfo from '../RecipeInfo/RecipeInfo';

type Props = {
  recipes: RecipeBaseFragment[];
  onSelected: (slug: string) => void;
};

// https://feathericons.com search
const icon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PHBhdGggZD0iTTIxIDIxbC00LjM1LTQuMzUiLz48L3N2Zz4=';

const MAX_ITEMS = 10;

function RecipeSearch(props: Props) {
  const [prevRecipes, setPrevRecipes] = useState(props.recipes);
  const [suggestions, setSuggestions] = useState<RecipeBaseFragment[]>(
    props.recipes.slice(0, MAX_ITEMS),
  );

  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
    isOpen,
    openMenu,
  } = useCombobox({
    id: 'recipesearch',
    labelId: 'recipesearch-label',
    inputId: 'recipesearch-input',
    menuId: 'recipesearch-menu',
    items: suggestions,
    defaultHighlightedIndex: 0,
    itemToString: () => '', // sneaky way to reset the input without any flash of selected item
    onInputValueChange: ({ inputValue }) => {
      setSuggestions(
        matchSorter(props.recipes, inputValue || '', { keys: ['title'] }).slice(0, MAX_ITEMS),
      );
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        props.onSelected(selectedItem.slug);
      }
    },
  });

  if (props.recipes !== prevRecipes) {
    setPrevRecipes(props.recipes);
    setSuggestions(matchSorter(props.recipes, inputValue, { keys: ['title'] }).slice(0, MAX_ITEMS));
  }

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <OutlinedInput
        inputProps={getInputProps()}
        placeholder="Hledat..."
        sx={{
          '& .MuiOutlinedInput-input': {
            backgroundImage: `url(${icon})`,
            backgroundPositionX: '8px',
            backgroundPositionY: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px 16px',
            borderRadius: '4px',
            color: colors.white,
            padding: '8px 8px 8px 32px',
            transition: 'background-color 200ms ease',

            '&:focus': {
              backgroundColor: colors.gray800,
            },
          },
        }}
        fullWidth
        onFocus={() => {
          if (inputValue) {
            openMenu();
          }
        }}
      />
      <Paper
        elevation={8}
        sx={{
          display: 'none',
          position: 'fixed',
          top: 'calc(57px + 0.5rem)',
          left: '0.5rem',
          right: '0.5rem',
          maxHeight: '288px',
          overflowX: 'hidden',
          overflowY: 'auto',
          zIndex: 1001,

          ...(isOpen && {
            display: 'block',
          }),

          '@media (min-width: 40em)': {
            position: 'absolute',
            top: 'calc(100% + 0.25rem)',
            left: 'initial',
            right: 0,
            width: '350px',
          },

          '@media (min-height: 412px)': {
            maxHeight: '352px',
          },
        }}
        {...getMenuProps()}
      >
        <List>
          {inputValue && suggestions.length === 0 && (
            <ListItem>
              <Alert severity="info" sx={{ width: '100%' }}>
                Žádné výsledky.
              </Alert>
            </ListItem>
          )}
          {isOpen &&
            suggestions.map((recipe, index) => {
              const { imageThumbWebPUrl, preparationTime, sideDish } = recipe;

              const imageUrl = imageThumbWebPUrl || '/assets/food-placeholder.webp';

              return (
                <ListItem
                  key={recipe.id}
                  sx={highlightedIndex === index ? { backgroundColor: colors.gray200 } : undefined}
                  {...getItemProps({ item: recipe, index })}
                >
                  <ListItemAvatar>
                    <Avatar alt={recipe.title} src={imageUrl} variant="rounded" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" noWrap>
                        {recipe.title}
                      </Typography>
                    }
                    secondary={
                      <RecipeInfo
                        placeholder={<>&nbsp;</>}
                        preparationTime={preparationTime ?? undefined}
                        sideDish={sideDish ?? undefined}
                        small
                      />
                    }
                    disableTypography
                  />
                </ListItem>
              );
            })}
        </List>
      </Paper>
    </Box>
  );
}

export default RecipeSearch;
