import {connect} from 'react-redux'

import SharedSchedule from './SharedSchedule'
import {selIsLoading} from '../../../selectors/pages/schedule'

function mapStateToProps(state, ownProps) {
  return {
    loading: selIsLoading(state),
    assistants: ownProps.assistantId
  }
}

export default connect(mapStateToProps)(SharedSchedule)
