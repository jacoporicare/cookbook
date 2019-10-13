import styled from '@emotion/styled';

import { colors } from '../../styles/colors';

const AutosuggestWrapper = styled.div({
  '.react-autosuggest__container': {
    position: 'relative',
  },
  '.react-autosuggest__suggestions-container': {
    display: 'none',
    position: 'absolute',
    top: '100%',
    maxHeight: '268px',
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    marginTop: '2px',
    border: `1px solid ${colors.gray200}`,
    borderRadius: '4px',
    backgroundColor: 'white',
    zIndex: 1001,
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.175)',
  },
  '.react-autosuggest__container--open .react-autosuggest__suggestions-container': {
    display: 'block',
  },
  '.react-autosuggest__suggestions-list': {
    listStyle: 'none',
    margin: 0,
    padding: '2px 0',
  },
  '.react-autosuggest__suggestion': {
    padding: '3px 20px',
  },
  '.react-autosuggest__suggestion--highlighted': {
    backgroundColor: colors.gray200,
    cursor: 'pointer',
  },
});

export default AutosuggestWrapper;
