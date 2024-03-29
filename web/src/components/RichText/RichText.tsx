import { styled } from '@mui/material';
import ReactMarkdown from 'react-markdown';

type Props = {
  text?: string;
};

const stepSize = 2;
const stepLineHeight = 1.5;

const StyledReactMarkdown = styled(ReactMarkdown)(({ theme }) => ({
  '& ol': {
    listStyleType: 'none',
    paddingLeft: 0,
    marginBottom: '1.5em',
    marginTop: 0,

    '& li': {
      counterIncrement: 'step-counter',
      position: 'relative',
      paddingLeft: `${stepSize + 1}em`,
      lineHeight: `${stepLineHeight}em`,

      '& + li': {
        marginTop: '1em',
      },

      '&::before': {
        content: 'counter(step-counter)',
        position: 'absolute',
        left: 0,
        top: `-${(stepSize - stepLineHeight) / 2}em`,
        width: `${stepSize}em`,
        height: `${stepSize}em`,
        lineHeight: `${stepSize}em`,
        textAlign: 'center',
        borderRadius: '50%',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },

  '& h1, & h2, & h3, & h4, & h5, & h6': {
    marginTop: 0,
  },
}));

function RichText({ text = '' }: Props) {
  return <StyledReactMarkdown>{text}</StyledReactMarkdown>;
}

export default RichText;
