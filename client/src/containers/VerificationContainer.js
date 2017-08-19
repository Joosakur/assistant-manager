import {connect} from 'react-redux';
import {postVerification} from "../thunks/verificationThunk";
import Verifier from "../components/registration/Verifier";

const mapStateToProps = (state) => {
  return {
    loading: state.verification.loading,
    error: state.verification.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => dispatch(postVerification(ownProps.token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Verifier);

