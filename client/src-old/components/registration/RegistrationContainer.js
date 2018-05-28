import RegistrationForm from './RegistrationForm'
import {connect} from 'react-redux'
import {postRegistration} from '../../../src-old/thunks/registrationThunk'
import {getTranslate} from 'react-localize-redux'

const mapStateToProps = state => {
  return {
    loading: state.registration.loading,
    msg: {...getTranslate(state.locale)([
      'signUp.email','signUp.password','signUp.firstName','signUp.lastName', 'signUp.birthday','signUp.city',
      'signUp.cbox1a','signUp.cbox1b','signUp.cbox2a','signUp.cbox2b','signUp.submit'
    ])}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (values) => dispatch(postRegistration(values))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)

