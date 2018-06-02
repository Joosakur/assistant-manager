import {connect} from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import WorkEvent from './WorkEvent'
import {listWorkShifts} from '../../actions/api/workShiftActions'
import {openWorkShiftModal} from '../../actions/ui/workShiftActions'
import DayControlsContainer from './DayControlsContainer'

const getEvent = (workShift, assistant) =>
{

  /*
   * Events which start and end on different days don't show up nicely by default. We shall instead render them to end
   * during same day.
   */
  let calStart = moment(workShift.start)
  let calEnd = moment(workShift.end)
  if(calEnd.dayOfYear() > calStart.dayOfYear() || calEnd.year() > calStart.year())
    calEnd.year(calStart.year()).dayOfYear(calStart.dayOfYear()).hours(23).minutes(59)

  let event = {
    id: workShift.id,
    start: workShift.start,
    end: workShift.end,
    calStart,
    calEnd,
    sick: workShift.sick
  }

  if(assistant)
    event.assistant = {
      id: assistant.id,
      name: assistant.nickName || (assistant.firstName + ' ' + assistant.lastName[0]),
      textColor: assistant.textColor,
      backgroundColor: assistant.backgroundColor
    }
  else
    event.assistant = {
      name: 'None',
      textColor: '#440000',
      backgroundColor: '#e4c9dd'
    }

  return event
}

const eventStyling = (assistantId) => (event) => { //start, end, isSelected
  return {style: {
    backgroundColor: assistantId && event.assistant.id !== assistantId ? '#aaaaaa' : event.assistant.backgroundColor,
    color: assistantId && event.assistant.id !== assistantId ? '#000000' : event.assistant.textColor,
    opacity: assistantId && event.assistant.id !== assistantId ? 0.5 : 1
  }}
}

const mapStateToProps = (state, ownProps) => {

  let events = Object.getOwnPropertyNames(state.entities.workShifts).map((id) => {
    let workShift = state.entities.workShifts [id]
    if(!workShift)
      return null
    let assistant = state.entities.assistants[workShift.assistantId]
    if(workShift.assistantId && !assistant) {
      console.warn('Oops, assistant of a work shift not found') // eslint-disable-line no-console
      return null
    } else {
      return getEvent(workShift, assistant)
    }
  }).filter((event) => event !== null)
    .sort((a,b) => {
      a = moment(a.start)
      b = moment(b.start)
      if(a.isBefore(b))
        return -1
      if(b.isBefore(a))
        return 1
      return 0
    })

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
    eventPropGetter: eventStyling(ownProps.workShiftId)
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
