import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

const WorkEvent = ({event:{start, end, sick, assistant: {name}}}) => {
  return (
    <div>{name} {sick && <span>sick</span>} {moment(start).format('HH:mm')} - {moment(end).format('HH:mm')}</div>
  );
};

WorkEvent.propTypes = {
  event: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    sick: PropTypes.bool,
    assistant: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired
    })
  }).isRequired
};

export default WorkEvent;

