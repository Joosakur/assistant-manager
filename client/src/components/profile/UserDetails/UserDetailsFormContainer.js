import {connect} from 'react-redux'
import moment from 'moment'

import ProfileForm, {reduxFormName} from './UserDetailsForm'
import {updateEmployer} from '../../../actions/api/employerActions'
import {selIsFormSubmitting} from '../../../selectors/forms'
import {selEmployer} from '../../../selectors/entities/employer'
import {dispatchForm} from '../../../utils/formUtils'

const mapStateToProps = state => {
  const employer = selEmployer(state)
  return {
    submitting: selIsFormSubmitting(reduxFormName)(state),
    initialValues: {
      ...employer,
      birthday: moment(employer.birthday).format('D.M.YYYY')
    }
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatchForm(dispatch, updateEmployer, values)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
