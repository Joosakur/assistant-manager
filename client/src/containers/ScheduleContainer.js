import {connect} from 'react-redux';
import {startWorkShiftEdit} from "../actions/workShiftActions";
import Schedule from "../components/schedule/Schedule";
import moment from "moment";
import {getWorkShifts} from "../thunks/workShiftsThunk";

function mapStateToProps(state) {
  return {
    loading: state.schedule.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateNew: () => dispatch(startWorkShiftEdit(null))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
