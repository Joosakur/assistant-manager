import {connect} from 'react-redux'
import {formValueSelector, reset} from 'redux-form'
import moment from 'moment'

import AssistantEditor, {reduxFormName} from './AssistantEditor'
import {createAssistant, updateAssistant} from '../../../actions/api/assistantActions'
import {closeAssistantModal} from '../../../actions/ui/assistantActions'
import {dispatchForm} from '../../../utils/formUtils'
import {selEditedAssistantId, selIsAssistantDialogOpen} from '../../../selectors/pages/assistants'
import {selAssistantById} from '../../../selectors/entities/assistants'
import {selIsFormSubmitting} from '../../../selectors/forms'

const getShortNameValue = (firstName, lastName, nickName) => {
  if (nickName && nickName.length > 0) return nickName

  return lastName && lastName.length > 0 ? `${firstName} ${lastName[0]}` : firstName
}

const mapStateToProps = state => {
  const assistantId = selEditedAssistantId(state)
  const assistant = assistantId ? selAssistantById(assistantId)(state) : null

  const selector = formValueSelector(reduxFormName)
  const {
    firstName = '',
    lastName = '',
    nickName = '',
    backgroundColor = '#cccccc',
    whiteText = false
  } = selector(state, 'firstName', 'lastName', 'nickName', 'backgroundColor', 'whiteText')
  const shortName = getShortNameValue(firstName, lastName, nickName)
  const props = {
    open: selIsAssistantDialogOpen(state),
    assistantId,
    submitting: selIsFormSubmitting(reduxFormName)(state),
    enableReinitialize: true,
    shortName,
    backgroundColor,
    whiteText
  }

  props.initialValues = assistant ? {
    assistantId,
    firstName:  assistant.firstName || '',
    lastName:  assistant.lastName || '',
    nickName:  assistant.nickName || '',
    birthday:  assistant.birthday && moment(assistant.birthday, 'YYYY-MM-DD').format('DD.MM.YYYY'),
    backgroundColor: assistant.backgroundColor || '#808080',
    whiteText: assistant.textColor === '#ffffff'
  } : {
    firstName: '',
    lastName: '',
    nickName: '',
    birthday: '',
    backgroundColor: '#cccccc',
    whiteText: false
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(closeAssistantModal())
      dispatch(reset(reduxFormName))
    },
    onSubmit: values => {
      const actionCreator = values.assistantId ? updateAssistant : createAssistant
      return dispatchForm(dispatch, actionCreator, values).then(() => dispatch(reset(reduxFormName)))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssistantEditor)
