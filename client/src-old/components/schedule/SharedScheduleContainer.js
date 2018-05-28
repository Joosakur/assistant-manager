import {connect} from 'react-redux'
import SharedSchedule from "./SharedSchedule"

function mapStateToProps(state, ownProps) {
  return {
    loading: state.schedule.loading,
    workShiftId: ownProps.workShiftId
  }
}

export default connect(mapStateToProps)(SharedSchedule)
