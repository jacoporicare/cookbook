import { ClassNames } from '@emotion/core';
import matchSorter from 'match-sorter';
import React, { FormEvent } from 'react';
import Autosuggest, {
  SuggestionsFetchRequestedParams,
  SuggestionSelectedEventData,
} from 'react-autosuggest';

import placeholder from '../../assets/food-placeholder.png';
import { colors } from '../../styles/colors';
import { Recipe } from '../../types';
import { getImageUrl } from '../../utils';
import RecipeInfo from '../RecipeInfo/RecipeInfo';
import { Box } from '../core';

type Props = {
  recipes: Recipe[];
  onSelected: (slug: string) => void;
};

type State = {
  value: string;
  suggestions: Recipe[];
};

// https://feathericons.com search
const icon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PHBhdGggZD0iTTIxIDIxbC00LjM1LTQuMzUiLz48L3N2Zz4=';

export default class RecipeSearch extends React.Component<Props, State> {
  state = {
    value: '',
    suggestions: [],
  };

  componentWillReceiveProps(nextProps: Props) {
    const { value } = this.state;

    if (value) {
      this.setState({
        suggestions: matchSorter(nextProps.recipes, value, { keys: ['title'] }),
      });
    }
  }

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleFetch = ({ value }: SuggestionsFetchRequestedParams) => {
    const { recipes } = this.props;

    this.setState({
      suggestions: matchSorter(recipes, value, { keys: ['title'] }),
    });
  };

  handleClear = () => {
    this.setState({ suggestions: [] });
  };

  handleSelected = (
    event: FormEvent<HTMLInputElement>,
    { suggestion }: SuggestionSelectedEventData<Recipe>,
  ) => {
    this.props.onSelected(suggestion.slug);
    this.setState({ value: '', suggestions: [] });
  };

  renderSuggestion = (recipe: Recipe) => {
    const { slug, hasImage, lastModifiedDate, preparationTime, sideDish } = recipe;
    const imageUrl = hasImage ? getImageUrl(slug, lastModifiedDate) : placeholder;

    return (
      <Box borderBottom={`1px solid ${colors.gray300}`} display="flex" height="64px">
        <Box
          borderRight={`1px solid ${colors.gray300}`}
          flex="none"
          height="64px"
          p={1}
          width="64px"
        >
          <Box
            css={{
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
            height="100%"
            style={{ backgroundImage: `url('${imageUrl}')` }}
            width="100%"
          />
        </Box>
        <Box
          css={{ minWidth: 0 }}
          display="flex"
          flex="auto"
          flexDirection="column"
          justifyContent="space-between"
          p={2}
        >
          <Box
            css={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
            overflow="hidden"
            width="100%"
          >
            {recipe.title}
          </Box>
          <Box color="#777" fontSize="0.75em">
            <RecipeInfo
              placeholder="žádné údaje"
              preparationTime={preparationTime}
              sideDish={sideDish}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  render() {
    const { value, suggestions } = this.state;

    return (
      <ClassNames>
        {({ css }) => (
          <Box
            alignItems="center"
            css={css`
              .react-autosuggest__container {
                position: relative;
                max-width: 400px;
                margin: 0 auto;
              }

              .react-autosuggest__suggestions-container {
                display: none;
                position: fixed;
                top: 64px;
                left: 0;
                width: 350px;
                max-height: 288px;
                margin: 2px 8px 0 8px;
                background-color: ${colors.white};
                border-radius: 4px;
                border: 1px solid ${colors.gray400};
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
                color: ${colors.gray900};
                overflow-x: hidden;
                overflow-y: auto;
                z-index: 1001;

                @media (min-width: 40em) {
                  position: absolute;
                  top: 100%;
                  left: initial;
                  right: 0;
                  width: 350px;
                }

                @media (min-height: 412px) {
                  max-height: 352px;
                }
              }

              .react-autosuggest__container--open .react-autosuggest__suggestions-container {
                display: block;
              }

              .react-autosuggest__suggestions-list {
                list-style: none;
                margin: 0;
                padding: 0;
              }

              .react-autosuggest__suggestion--highlighted {
                background-color: ${colors.gray200};
                cursor: pointer;
              }
            `}
            display="flex"
          >
            <Autosuggest
              focusInputOnSuggestionClick={false}
              getSuggestionValue={r => r.title}
              inputProps={{
                value,
                onChange: this.handleChange,
                placeholder: 'Hledat...',
                className: css`
                  appearance: none;
                  background-color: transparent;
                  background-image: url(${icon});
                  background-position-x: 5px;
                  background-position-y: center;
                  background-repeat: no-repeat;
                  background-size: 16px 16px;
                  border: 0;
                  border-radius: 4px;
                  color: white;
                  font-size: 16px;
                  margin: 8px;
                  outline: 0;
                  padding: 5px 5px 5px 16px;
                  transition: width 200ms ease, padding 200ms ease, background-color 100ms ease;
                  width: 16px;

                  @media (max-width: 600px) {
                    &:focus {
                      padding-left: 29px;
                      width: 8rem;
                    }
                  }

                  &:focus {
                    background-color: #444;
                  }

                  @media (min-width: 601px) {
                    width: 12rem;
                    padding-left: 29px;
                  }
                `,
              }}
              renderSuggestion={this.renderSuggestion}
              suggestions={suggestions}
              highlightFirstSuggestion
              onSuggestionsClearRequested={this.handleClear}
              onSuggestionSelected={this.handleSelected}
              onSuggestionsFetchRequested={this.handleFetch}
            />
          </Box>
        )}
      </ClassNames>
    );
  }
}
