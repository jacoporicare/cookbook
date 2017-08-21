import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import HtmlBuilder from './htmlBuilder';
import './RichText.scss';

const formatText = value =>
  value
    .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
    .replace(/_([^_\n]+)_/g, '<em>$1</em>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>');

const getHtml = text => {
  if (!text) {
    return null;
  }

  const lines = text
    .replace(/[\u00A0-\u9999<>&]/gi, i => `&#${i.charCodeAt(0)};`) // encode HTML
    .split(/\n/g);

  const hb = new HtmlBuilder();

  lines.forEach(l => {
    let line = l.trim();

    if (line === '' && hb.isOpen('li')) {
      hb.closeAll(); // empty line after list item - close "li" and "ol"
      return;
    }

    if (line.indexOf('*)') === 0) {
      if (hb.isOpen('li')) {
        hb.close();
      }

      if (!hb.isOpen('ol')) {
        hb.open('<ol>');
      }

      hb.open(`<li>`);
      line = line.substring(2).trim();
    } else if (hb.isOpen('li')) {
      hb.write('<br>');
    }

    if (line !== '') {
      hb.write(formatText(line));
    }

    if (!hb.isOpen('li')) {
      hb.write('<br>');
    }
  });

  return hb.getHtml();
};

/* eslint-disable react/no-danger */
const RichText = ({ text, isMarkdown }) =>
  isMarkdown
    ? <ReactMarkdown source={text} className="cb-rich-text" />
    : <div
        className="cb-rich-text"
        dangerouslySetInnerHTML={{ __html: getHtml(text) }}
      />;
/* eslint-enable react/no-danger */

RichText.propTypes = {
  text: PropTypes.string,
  isMarkdown: PropTypes.bool,
};

export default RichText;
