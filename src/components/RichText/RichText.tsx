import { ClassNames } from '@emotion/core';
import { darken } from 'polished';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { theme, colorYiq } from '../../styles/colors';

type Props = {
  text?: string;
};

const stepSize = 2;
const stepLineHeight = 1.5;

function RichText({ text = '' }: Props) {
  return (
    <ClassNames>
      {({ css }) => (
        <ReactMarkdown
          className={css`
            ol {
              list-style-type: none;
              padding-left: 0;
              margin-bottom: 1.5em;

              li {
                counter-increment: step-counter;
                position: relative;
                padding-left: ${stepSize + 1}em;
                line-height: ${stepLineHeight}em;

                & + li {
                  margin-top: 1em;
                }
              }

              li::before {
                content: counter(step-counter);
                position: absolute;
                left: 0;
                top: -${(stepSize - stepLineHeight) / 2}em;
                width: ${stepSize}em;
                height: ${stepSize}em;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid ${darken(0.1, theme.primary)};
                border-radius: 50%;
                color: ${colorYiq(theme.primary)};
                background-color: ${theme.primary};
              }
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              margin-top: 0;
            }
          `}
          source={text}
        />
      )}
    </ClassNames>
  );
}

export default RichText;
