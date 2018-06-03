import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getTranslate} from 'react-localize-redux'

import Verifier from './Verifier'
import { verifyRegistration } from '../../actions/api/employerActions'
import { selIsLoading, selError } from '../../selectors/pages/verification'

const mapStateToProps = (state) => {
  return {
    loading: selIsLoading(state),
    error: selError(state),
    msg: {...getTranslate(state.locale)([
      'signUp.verified.verifying', 'signUp.verified.errorTitle',
        'signUp.verified.title','signUp.verified.subtitle','signUp.verified.proceedBtn'
    ])}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => dispatch(verifyRegistration(ownProps.token))
  }
}

const VerificationContainer = connect(mapStateToProps, mapDispatchToProps)(Verifier)

VerificationContainer.propTypes = {
  token: PropTypes.string.isRequired
}

export default VerificationContainer
