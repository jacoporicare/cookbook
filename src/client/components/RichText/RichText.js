import React, { PropTypes } from 'react';

const RichText = ({ text }) => {
  return (
    <pre>
      {text}
    </pre>
  );
};

RichText.propTypes = {
  text: PropTypes.string
};

export default RichText;
