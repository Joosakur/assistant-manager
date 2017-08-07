import {connect} from 'react-redux';
import LoginForm from "../components/login/LoginForm";
import {postLogin} from "../thunks/loginThunk";

const mapStateToProps = state => {
  return {
    loading: state.login.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (values) => dispatch(postLogin(values.email, values.password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

