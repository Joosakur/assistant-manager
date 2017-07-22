import RegistrationForm from '../components/registration/RegistrationForm';
import {connect} from 'react-redux';
import {postRegistration} from '../thunks/registrationThunk';


const mapStateToProps = state => {
  return {
    loading: state.registration.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (values) => dispatch(postRegistration(values))
  };
};

/*
const RegistrationContainer = () => {
  return
}
*/

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

