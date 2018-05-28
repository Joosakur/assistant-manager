import {connect} from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import LoginForm from './LoginForm'
import { login } from '../../actions/authActions'
import {dispatchForm} from '../../utils/formUtils'

const mapStateToProps = state => {
  return {
    loading: false, //state.login.loading,
    translate: getTranslate(state.locale)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: ({email, password}) => dispatchForm(dispatch, login, {email, password})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
