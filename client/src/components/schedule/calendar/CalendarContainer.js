import {connect} from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import WorkEvent from './WorkEvent'
import DayControlsContainer from './DayControlsContainer'
import {listWorkShifts} from '../../../actions/api/workShiftActions'
import {openWorkShiftModal} from '../../../actions/ui/workShiftActions'
import {selWorkShiftsArray} from '../../../selectors/entities/workShifts'
import {selAssistantById} from '../../../selectors/entities/assistants'

const calculateCalendarEnd = (start, end) => {
  /*
   * Events which start and end on different days don't show up nicely by default. We shall instead render them to end
   * during same day.
   */
  const calStart = moment(start)
  let calEnd = moment(end)
  if(calEnd.dayOfYear() > calStart.dayOfYear() || calEnd.year() > calStart.year())
    calEnd.year(calStart.year()).dayOfYear(calStart.dayOfYear()).hours(23).minutes(59)
  return calEnd
}

const buildEvent = (workShift, assistant = {}) =>
{
  const { id: workShiftId, start, end, sick } = workShift
  const { id: assistantId, firstName, lastName, nickName, textColor, backgroundColor } = assistant
  return {
    id: workShiftId,
    start,
    end,
    calStart: moment(start),
    calEnd: calculateCalendarEnd(start, end),
    sick,
    assistant: {
      id: assistantId,
      name: assistantId ? (nickName || `${firstName} ${lastName[0]}`) : 'None',
      textColor: textColor || '#440000',
      backgroundColor: backgroundColor || '#e4c9dd'
    }
  }
}

const eventStyling = assistantId => ({ assistant: { id: eventAssistantId, backgroundColor, textColor } }) => {
  return {style: {
    backgroundColor: assistantId && eventAssistantId !== assistantId ? '#aaaaaa' : backgroundColor,
    color: assistantId && eventAssistantId !== assistantId ? '#000000' : textColor,
    opacity: assistantId && eventAssistantId !== assistantId ? 0.5 : 1
  }}
}

const buildEvents = state => {
  const workShifts = selWorkShiftsArray(state)
  const events = workShifts.map(workShift => {
    let assistant
    if (workShift.assistantId) {
      assistant = selAssistantById(workShift.assistantId)(state)
      if(!assistant) {
        console.warn('Assistant of a work shift not found') // eslint-disable-line no-console
        return null
      }
    }
    return buildEvent(workShift, assistant)
  })

  return events.filter(e => !!e)
}

const eventTimeComparator = (a,b) => {
  a = moment(a.start)
  b = moment(b.start)
  if(a.isBefore(b))
    return -1
  if(b.isBefore(a))
    return 1
  return 0
}

const mapStateToProps = (state, ownProps) => {
  const events = buildEvents(state).sort(eventTimeComparator)

  return {
    loading: false,
    events: events,
    defaultDate: new Date(),
    startAccessor: 'calStart',
    endAccessor: 'calEnd',
    views: ['month'],
    components: {
      event: WorkEvent,
      dateCellWrapper: DayControlsContainer
    },
    eventPropGetter: eventStyling(ownProps.assistantId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNavigate: (date) => {
      const from = moment(date).date(1).add(-7, 'days').hours(0).minutes(0).second(0).millisecond(0).format()
      const to = moment(date).add(1, 'month').date(1).add(7, 'days').hours(0).minutes(0).second(0).millisecond(0).format()
      const assistantId = ownProps.assistantId
      dispatch(listWorkShifts({from, to, assistantId}))
    },
    onSelectEvent: (event, e) => {
      e.preventDefault()
      dispatch(openWorkShiftModal(event.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BigCalendar)
