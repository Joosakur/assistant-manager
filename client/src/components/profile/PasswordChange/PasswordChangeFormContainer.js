import {connect} from 'react-redux'
import {formValueSelector, reset} from 'redux-form'

import PasswordChangeForm, {reduxFormName} from './PasswordChangeForm'
import {changePassword} from '../../../actions/api/employerActions'
import {selIsFormSubmitting} from '../../../selectors/forms'
import {dispatchForm} from '../../../utils/formUtils'

const mapStateToProps = state => {
  return {
    submitting: selIsFormSubmitting(reduxFormName)(state),
    newPassword: formValueSelector(reduxFormName)(state, 'newPassword') || ''
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatchForm(dispatch, changePassword, values).then(() => dispatch(reset(reduxFormName)))
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangeForm)
