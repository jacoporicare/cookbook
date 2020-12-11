import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { matchSorter } from 'match-sorter';
import React, { FormEvent, useState } from 'react';
import Autosuggest, {
  RenderSuggestionsContainerParams,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest';

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
  wrapper: {
    '& .react-autosuggest__container': {
      position: 'relative',
      maxWidth: '400px',
      margin: '0 auto',
    },

    '& .react-autosuggest__suggestions-container': {
      display: 'none',
      position: 'fixed',
      top: '64px',
      left: 0,
      width: '350px',
      maxHeight: '288px',
      margin: '2px 8px 0 8px',
      color: colors.gray900,
      backgroundColor: colors.white,
      borderRadius: '4px',
      boxShadow:
        '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
      overflowX: 'hidden',
      overflowY: 'auto',
      zIndex: 1001,
    },

    '& .react-autosuggest__container--open .react-autosuggest__suggestions-container': {
      display: 'block',
    },

    // '& .react-autosuggest__suggestions-list': {
    //   listStyle: 'none',
    //   margin: 0,
    //   padding: 0,
    // },

    '& .react-autosuggest__suggestion--highlighted': {
      backgroundColor: colors.gray200,
      cursor: 'pointer',
    },
  },

  '@media (min-width: 40em)': {
    wrapper: {
      '& .react-autosuggest__suggestions-container': {
        position: 'absolute',
        top: '100%',
        left: 'initial',
        right: 0,
        width: '350px',
      },
    },
  },

  '@media (min-height: 412px)': {
    wrapper: {
      '& .react-autosuggest__suggestions-container': {
        maxHeight: '352px',
      },
    },
  },

  input: {
    appearance: 'none',
    backgroundColor: 'transparent',
    backgroundImage: `url(${icon})`,
    backgroundPositionX: '5px',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px 16px',
    border: 0,
    borderRadius: '4px',
    color: 'white',
    fontSize: '16px',
    margin: '8px',
    outline: 0,
    padding: '5px 5px 5px 29px',
    transition: 'width 200ms ease, padding 200ms ease, background-color 100ms ease',
    width: 'calc(100% - 16px)',
    paddingLeft: '29px',

    '&:focus': {
      backgroundColor: '#444',
    },
  },

  image: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100%',
    width: '100%',
  },
});

function RecipeSearch(props: Props) {
  const classes = useStyles();
  const supportsWebP = useSupportsWebP();

  const [prevRecipes, setPrevRecipes] = useState(props.recipes);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<RecipeBaseFragment[]>([]);

  if (props.recipes !== prevRecipes) {
    setPrevRecipes(props.recipes);
    setSuggestions(matchSorter(props.recipes, value, { keys: ['title'] }));
  }

  function handleChange(event: FormEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function handleFetch({ value }: SuggestionsFetchRequestedParams) {
    setSuggestions(matchSorter(props.recipes, value, { keys: ['title'] }));
  }

  function handleClear() {
    setSuggestions([]);
  }

  function handleSelected(
    _event: FormEvent<HTMLInputElement>,
    { suggestion }: SuggestionSelectedEventData<RecipeBaseFragment>,
  ) {
    props.onSelected(suggestion.slug);
    setValue('');
    setSuggestions([]);
  }

  function renderSuggestionsContainer(params: RenderSuggestionsContainerParams) {
    return <List {...params.containerProps}>{params.children}</List>;
  }

  function renderSuggestion(recipe: RecipeBaseFragment) {
    const { image, preparationTime, sideDish } = recipe;

    const thumbUrl = supportsWebP ? image?.thumbWebPUrl : image?.thumbUrl;
    const placeholderUrl = `/assets/food-placeholder.${supportsWebP ? 'webp' : 'png'}`;
    const imageUrl = thumbUrl || placeholderUrl;

    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={recipe.title} src={imageUrl} variant="rounded" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="body1">{recipe.title}</Typography>}
          secondary={
            <RecipeInfo
              placeholder={<>&nbsp;</>}
              preparationTime={preparationTime}
              sideDish={sideDish}
              small
            />
          }
          disableTypography
        />
      </ListItem>
    );
  }

  return (
    <Box alignItems="center" className={classes.wrapper} display="flex">
      <Autosuggest
        focusInputOnSuggestionClick={false}
        getSuggestionValue={r => r.title}
        inputProps={{
          value,
          onChange: handleChange,
          placeholder: 'Hledat...',
          className: classes.input,
        }}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        suggestions={suggestions}
        highlightFirstSuggestion
        onSuggestionSelected={handleSelected}
        onSuggestionsClearRequested={handleClear}
        onSuggestionsFetchRequested={handleFetch}
      />
    </Box>
  );
}

export default RecipeSearch;
