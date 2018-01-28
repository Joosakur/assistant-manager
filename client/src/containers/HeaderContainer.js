import {connect} from 'react-redux'
import AppHeader from '../components/header/AppHeader'
import {logout} from "../thunks/loginThunk"
import { getTranslate } from 'react-localize-redux'


function mapStateToProps(state) {
  return {
    authenticated: state.login.authenticated,
    userData: state.login.userData,
    translate: getTranslate(state.locale)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: (e) => {
      e.preventDefault()
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)

