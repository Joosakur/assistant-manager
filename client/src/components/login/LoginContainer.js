import {connect} from 'react-redux'

import LoginForm, { reduxFormName } from './LoginForm'
import { login } from '../../actions/authActions'
import {dispatchForm} from '../../utils/formUtils'
import {selIsFormSubmitting} from '../../selectors/forms'

const mapStateToProps = state => {
  return {
    submitting: selIsFormSubmitting(reduxFormName)(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: ({email, password}) => dispatchForm(dispatch, login, {email, password})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
