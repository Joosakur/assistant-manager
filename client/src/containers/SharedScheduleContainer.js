import {connect} from 'react-redux';
import {startWorkShiftEdit} from "../actions/workShiftActions";
import Schedule from "../components/schedule/Schedule";

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
