import { css } from 'emotion';

import { colors } from '../../styles/colors';

const autosuggestStyle = css`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__suggestions-container {
    display: none;
    position: absolute;
    top: 100%;
    max-height: 268px;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 2px;
    border: 1px solid ${colors.gray200};
    border-radius: 4px;
    background-color: white;
    z-index: 1001;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }

  .react-autosuggest__container--open .react-autosuggest__suggestions-container {
    display: block;
  }

  .react-autosuggest__suggestions-list {
    list-style: none;
    margin: 0;
    padding: 2px 0;
  }

  .react-autosuggest__suggestion {
    padding: 3px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: ${colors.gray200};
    cursor: pointer;
  }
`;

export default autosuggestStyle;
