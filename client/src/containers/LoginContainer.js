import {connect} from 'react-redux';
import LoginForm from "../components/login/LoginForm";
import {postLogin} from "../thunks/loginThunk";
import { getTranslate } from 'react-localize-redux';

const mapStateToProps = state => {
  return {
    loading: state.login.loading,
    translate: getTranslate(state.locale)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (values) => dispatch(postLogin(values.email, values.password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

