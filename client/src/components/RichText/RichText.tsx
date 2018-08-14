import React from 'react';
import ReactMarkdown from 'react-markdown';
import { css } from 'emotion';

type Props = {
  text?: string;
};

const stepSize = 2;
const stepLineHeight = 1.5;

const richText = css`
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
      line-height: ${stepSize}em;
      text-align: center;
      border: 1px solid #bce8f1;
      border-radius: 50%;
      font-weight: bold;
      color: #31708f;
      background-color: #d9edf7;
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
`;

export const RichText = ({ text = '' }: Props) => (
  <ReactMarkdown source={text} className={richText} />
);
