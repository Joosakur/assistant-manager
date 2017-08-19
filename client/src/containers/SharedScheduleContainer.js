import {connect} from 'react-redux';
import SharedSchedule from "../components/schedule/SharedSchedule";

function mapStateToProps(state, ownProps) {
  return {
    loading: state.schedule.loading,
    assistantId: ownProps.assistantId
  };
}

export default connect(mapStateToProps)(SharedSchedule);
