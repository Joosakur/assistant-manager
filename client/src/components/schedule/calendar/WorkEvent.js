import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Icon} from 'semantic-ui-react'

const WorkEvent = ({event:{start, end, sick, assistant: {name}}}) => {
  start = moment(start)
  end = moment(end)
  let startTime = start.minutes() > 0 ? start.format('HH:mm') : start.format('HH')
  let endTime = end.minutes() > 0 ? end.format('HH:mm') : end.format('HH')

  return (
    <div className='event-data-container'>
      <div className='event-data-item event-data-item-name'>
        {name}
        {sick && (
          <Icon name='plus' circular size='tiny' className='icon-sick'/>
        )}
      </div>
      <div className='event-data-item event-data-item-time'>{startTime}-{endTime}</div>
    </div>
  )
}

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
}

export default WorkEvent
