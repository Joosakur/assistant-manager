import {connect} from 'react-redux';
import {ownPropsToArray} from "../utils/jsUtils";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import WorkEvent from "../components/schedule/WorkEvent";

const getEvent = (workShift, assistant) =>
{

  /*
   * Events which start and end on different days don't show up nicely by default. We shall instead render them to end
   * during same day.
   */
  let calStart = moment(workShift.start);
  let calEnd = moment(workShift.end);
  if(calEnd.dayOfYear() > calStart.dayOfYear() || calEnd.year() > calStart.year())
    calEnd.year(calStart.year()).dayOfYear(calStart.dayOfYear()).hours(23).minutes(59);

  let event = {
    start: workShift.start,
    end: workShift.end,
    calEnd: calEnd
  };

  if(assistant)
    event.assistant = {
      id: assistant.id,
      name: assistant.nickName || (assistant.firstName + " " + assistant.lastName[0]),
      textColor: assistant.textColor,
      backgroundColor: assistant.backgroundColor
    };
  else
    event.assistant = {
      name: "None",
      textColor: "#440000",
      backgroundColor: "#e4c9dd"
    };

  return event;
};

const eventStyling = (event, start, end, isSelected) => {
  return {style: {
    backgroundColor: event.assistant.backgroundColor,
    color: event.assistant.textColor
  }};
};

const mapStateToProps = state => {

  let events = Object.getOwnPropertyNames(state.entities.workShifts).map((id) => {
    let workShift = state.entities.workShifts [id];
    let assistant = state.entities.assistants[workShift.assistantId];
    if(!assistant) {
      console.warn("Oops, assistant of a work shift not found");
      return null;
    } else {
      return getEvent(workShift, assistant);
    }
  }).filter((event) => event !== null);

  return {
    loading: state.login.loading,
    events: events,
    defaultDate: new Date(),
    startAccessor: 'start',
    endAccessor: 'calEnd',
    views: ['month'],
    components: {
      event: WorkEvent
    },
    eventPropGetter: eventStyling
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BigCalendar);
