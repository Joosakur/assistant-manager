import {connect} from 'react-redux'
import {postVerification} from "../../../src-old/thunks/verificationThunk"
import Verifier from "./Verifier"
import {getTranslate} from "react-localize-redux"

const mapStateToProps = (state) => {
  return {
    loading: state.verification.loading,
    error: state.verification.error,
    msg: {...getTranslate(state.locale)([
      "signUp.verified.title","signUp.verified.subtitle","signUp.verified.proceedBtn"
    ])}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => dispatch(postVerification(ownProps.token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verifier)

