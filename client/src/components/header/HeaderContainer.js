import { connect } from 'react-redux'

import AppHeader from './AppHeader'
import { logout } from '../../actions/authActions'
import {selIsAuthenticated} from '../../selectors/auth'
import {selEmployer} from '../../selectors/entities/employer'

const mapStateToProps = state => {
  return {
    authenticated: selIsAuthenticated(state),
    userData: selEmployer(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: (e) => {
      e.preventDefault()
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)

