import {connect} from 'react-redux'
import {startWorkShiftEdit} from "../actions/api/workShiftActions"
import Schedule from "../components/schedule/Schedule"
import {getTranslate} from 'react-localize-redux'

function mapStateToProps(state) {
  return {
    loading: state.schedule.loading,
    translate: getTranslate(state.locale)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateNew: () => dispatch(startWorkShiftEdit(null))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
