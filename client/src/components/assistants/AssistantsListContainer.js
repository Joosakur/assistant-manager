import {connect} from 'react-redux'

import AssistantsList from './AssistantsList'
import {openAssistantModal} from '../../actions/ui/assistantActions'
import {selAssistantsArrayOrderedByName} from '../../selectors/entities/assistants'
import {selIsLoading} from '../../selectors/pages/assistants'

const mapStateToProps = state => {
  return {
    loading: selIsLoading(state),
    assistants: selAssistantsArrayOrderedByName(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openEditAssistantDialog: id => dispatch(openAssistantModal(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssistantsList)
