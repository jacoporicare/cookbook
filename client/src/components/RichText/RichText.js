import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import './RichText.scss';

const RichText = ({ text }) => (
  <ReactMarkdown source={text} className="cb-rich-text" />
);

RichText.propTypes = {
  text: PropTypes.string,
};

export default RichText;
