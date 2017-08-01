import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import {Icon, IconGroup} from "semantic-ui-react";

const WorkEvent = ({event:{start, end, sick, assistant: {name}}}) => {
  start = moment(start);
  end = moment(end);
  let startTime = start.minutes() > 0 ? start.format('HH:mm') : start.format('HH');
  let endTime = end.minutes() > 0 ? end.format('HH:mm') : end.format('HH');


  return (
    <div>
      <span>{name}</span>
      {sick && (
        <IconGroup size="big">
          <Icon name="doctor" style={{color: 'black'}}/>
          <Icon name="doctor" style={{color: 'black'}}/>
        </IconGroup>
      )}
      <span>{startTime}-{endTime}sss</span></div>
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

