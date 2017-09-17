import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';

const SpinnerAlert = ({ level, text, spinner }) =>
  spinner ? <Spinner /> : <div className={`alert alert-${level}`}>{text}</div>;

SpinnerAlert.propTypes = {
  level: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  spinner: PropTypes.bool,
};

export default SpinnerAlert;
