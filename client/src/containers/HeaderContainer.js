import {connect} from 'react-redux';
import AppHeader from '../components/header/AppHeader';
import {logout} from "../thunks/loginThunk";

function mapStateToProps(state) {
  return {
    authenticated: state.login.authenticated,
    userData: state.login.userData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: (e) => {
      e.preventDefault();
      dispatch(logout());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);

