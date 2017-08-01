import {connect} from 'react-redux';
import ScheduleModalForm from "../components/schedule/ScheduleModalForm";
import {endWorkShiftEdit} from "../actions/workShiftActions";
import {ownPropsToArray} from "../utils/jsUtils";
import moment from "moment";
import {deleteWorkShift, sendWorkShiftEdit} from "../thunks/workShiftsThunk";

const mapStateToProps = state => {
  let targetId = state.schedule.target;
  let target;
  if(targetId)
    target = state.entities.workShifts[targetId];

  return {
    open: state.schedule.editing,
    target: targetId,
    submitting: state.schedule.submitting,
    assistants: ownPropsToArray(state.entities.assistants),
    enableReinitialize: true,
    initialValues: {
      assistant:  target && target.assistantId ? target.assistantId : "Unassigned",
      startDate: target ? moment(target.start).format("DD.MM.YYYY") :  moment().format("DD.MM.YYYY"),
      target: targetId,
      startTimeHours: target ? moment(target.start).hours() : null,
      startTimeMinutes: target ? moment(target.start).minutes() : null,
      endTimeHours: target ? moment(target.end).hours() : null,
      endTimeMinutes: target ? moment(target.end).minutes() : null,
      sick: target ? target.sick : false
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => dispatch(endWorkShiftEdit()),
    onSubmit: (values) => dispatch(sendWorkShiftEdit(values)),
    onDelete: (id) => {
      dispatch(deleteWorkShift(id))
    }
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(ScheduleModalForm);
