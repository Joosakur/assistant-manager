import {connect} from 'react-redux'
import {reset} from 'redux-form'
import moment from 'moment'
import { pathOr } from 'ramda'

import ScheduleModalForm, {reduxFormName} from './ScheduleModalForm'
import {closeWorkShiftModal} from '../../../actions/ui/workShiftActions'
import {createWorkShift, updateWorkShift, deleteWorkShift} from '../../../actions/api/workShiftActions'
import {dispatchForm} from '../../../utils/formUtils'
import {selIsFormSubmitting} from '../../../selectors/forms'
import {selAssistantsArrayOrderedByName} from '../../../selectors/entities/assistants'
import {selWorkShiftById} from '../../../selectors/entities/workShifts'
import {selEditedWorkShiftId, selIsWorkShiftDialogOpen} from '../../../selectors/pages/schedule'

const mapStateToProps = state => {
  const workShiftId = selEditedWorkShiftId(state)
  const workShift = workShiftId ? selWorkShiftById(workShiftId)(state) : null

  return {
    open: selIsWorkShiftDialogOpen(state),
    workShiftId,
    submitting: selIsFormSubmitting(reduxFormName)(state),
    assistants: selAssistantsArrayOrderedByName(state),
    enableReinitialize: true,
    initialValues: {
      workShiftId,
      assistant:  pathOr('Unassigned', ['assistantId'], workShift),
      startDate: workShift ? moment(workShift.start).format('DD.MM.YYYY') :  moment().format('DD.MM.YYYY'),
      startTimeHours: workShift ? moment(workShift.start).hours() : null,
      startTimeMinutes: workShift ? moment(workShift.start).format('mm') : '00',
      endTimeHours: workShift ? moment(workShift.end).hours() : null,
      endTimeMinutes: workShift ? moment(workShift.end).format('mm') : '00',
      sick: workShift ? workShift.sick : false
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(closeWorkShiftModal())
      dispatch(reset(reduxFormName))
    },
    onSubmit: values => {
      const actionCreator = values.workShiftId ? updateWorkShift : createWorkShift
      return dispatchForm(dispatch, actionCreator, values).then(() => dispatch(reset(reduxFormName)))
    },
    onDelete: (id) => {
      dispatch(deleteWorkShift(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleModalForm)
