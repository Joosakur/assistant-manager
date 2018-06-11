import {connect} from 'react-redux'

import {openWorkShiftModal} from '../../actions/ui/workShiftActions'
import {selIsLoading} from '../../selectors/pages/schedule'
import Schedule from './Schedule'

function mapStateToProps(state) {
  return {
    loading: selIsLoading(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateNew: () => dispatch(openWorkShiftModal(null))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
