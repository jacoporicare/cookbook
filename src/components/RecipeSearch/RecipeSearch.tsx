import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  OutlinedInput,
  Paper,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import classNames from 'classnames';
import { useCombobox } from 'downshift';
import { matchSorter } from 'match-sorter';
import React, { useState } from 'react';

import { RecipeBaseFragment } from '../../generated/graphql';
import useSupportsWebP from '../../hooks/useSupportsWebP';
import { colors } from '../../styles/colors';
import RecipeInfo from '../RecipeInfo/RecipeInfo';

type Props = {
  recipes: RecipeBaseFragment[];
  onSelected: (slug: string) => void;
};

// https://feathericons.com search
const icon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PHBhdGggZD0iTTIxIDIxbC00LjM1LTQuMzUiLz48L3N2Zz4=';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: '400px',
    margin: '0 auto',
  },

  input: {
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

  inputNotchedOutline: {
    border: 0,
  },

  open: {},

  menu: {
    display: 'none',
    position: 'fixed',
    top: 'calc(57px + 0.5rem)',
    left: '0.5rem',
    right: '0.5rem',
    maxHeight: '288px',
    overflowX: 'hidden',
    overflowY: 'auto',
    zIndex: 1001,

    '&$open': {
      display: 'block',
    },
  },

  '@media (min-width: 40em)': {
    menu: {
      position: 'absolute',
      top: 'calc(100% + 0.25rem)',
      left: 'initial',
      right: 0,
      width: '350px',
    },
  },

  '@media (min-height: 412px)': {
    menu: {
      maxHeight: '352px',
    },
  },

  highlighted: {
    backgroundColor: colors.gray200,
  },

  alert: {
    width: '100%',
  },
});

function RecipeSearch(props: Props) {
  const classes = useStyles();
  const supportsWebP = useSupportsWebP();

  const [prevRecipes, setPrevRecipes] = useState(props.recipes);
  const [suggestions, setSuggestions] = useState<RecipeBaseFragment[]>(props.recipes);

  const {
    getComboboxProps,
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
      setSuggestions(matchSorter(props.recipes, inputValue || '', { keys: ['title'] }));
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        props.onSelected(selectedItem.slug);
      }
    },
  });

  if (props.recipes !== prevRecipes) {
    setPrevRecipes(props.recipes);
    setSuggestions(matchSorter(props.recipes, inputValue, { keys: ['title'] }));
  }

  return (
    <div className={classes.root}>
      <div {...getComboboxProps()}>
        <OutlinedInput
          classes={{
            input: classes.input,
            notchedOutline: classes.inputNotchedOutline,
          }}
          inputProps={getInputProps()}
          placeholder="Hledat..."
          fullWidth
          onFocus={() => {
            if (inputValue) {
              openMenu();
            }
          }}
        />
      </div>
      <Paper
        className={classNames(classes.menu, { [classes.open]: isOpen })}
        elevation={8}
        {...getMenuProps()}
      >
        <List>
          {inputValue && suggestions.length === 0 && (
            <ListItem>
              <Alert className={classes.alert} severity="info">
                Žádné výsledky.
              </Alert>
            </ListItem>
          )}
          {suggestions.map((recipe, index) => {
            const { imageThumbUrl, imageThumbWebPUrl, preparationTime, sideDish } = recipe;

            const thumbUrl = supportsWebP ? imageThumbWebPUrl : imageThumbUrl;
            const placeholderUrl = `/assets/food-placeholder.${supportsWebP ? 'webp' : 'png'}`;
            const imageUrl = thumbUrl || placeholderUrl;

            return (
              <ListItem
                key={recipe.id}
                className={highlightedIndex === index ? classes.highlighted : undefined}
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
    </div>
  );
}

export default RecipeSearch;
