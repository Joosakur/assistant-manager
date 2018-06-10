import {connect} from 'react-redux'

import RegistrationForm, {reduxFormName} from './RegistrationForm'
import {selIsFormSubmitting} from '../../selectors/forms'
import {dispatchForm} from '../../utils/formUtils'
import {register} from '../../actions/api/employerActions'

const mapStateToProps = state => {
  return {
    submitting: selIsFormSubmitting(reduxFormName)(state)
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatchForm(dispatch, register, values)
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
