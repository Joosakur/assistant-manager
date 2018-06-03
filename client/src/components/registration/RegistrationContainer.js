import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import RegistrationForm, {reduxFormName} from './RegistrationForm'
import {selIsFormSubmitting} from '../../selectors/forms'
import {dispatchForm} from '../../utils/formUtils'
import {register} from '../../actions/api/employerActions'

const mapStateToProps = state => {
  return {
    submitting: selIsFormSubmitting(reduxFormName)(state),
    msg: {...getTranslate(state.locale)([
      'signUp.email','signUp.password','signUp.firstName','signUp.lastName', 'signUp.birthday','signUp.city',
      'signUp.cbox1a','signUp.cbox1b','signUp.cbox2a','signUp.cbox2b','signUp.submit'
    ])}
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatchForm(dispatch, register, values)
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
