import React from 'react';
import ReactMarkdown from 'react-markdown';

import './RichText.scss';

interface Props {
  text?: string;
}

const RichText = ({ text = '' }: Props) => <ReactMarkdown source={text} className="cb-rich-text" />;

export default RichText;
