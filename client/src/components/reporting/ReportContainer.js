import {connect} from 'react-redux'
import {actions, reset} from 'redux-form'
import { getTranslate } from 'react-localize-redux'
import moment from 'moment'

import ReportForm, {reduxFormName} from './ReportForm'
import {requestReport} from '../../actions/api/reportActions'
import {resetReportForm} from '../../actions/ui/reportActions'
import {selAssistantsArray} from '../../selectors/entities/assistants'
import {selEmployer} from '../../selectors/entities/employer'
import {selIsPolling, selDownloadLink, selIsDownloadable} from '../../selectors/pages/reporting'
import {selIsFormSubmitting} from '../../selectors/forms'
import {dispatchForm} from '../../utils/formUtils'

const mapStateToProps = state => {
  const assistants = selAssistantsArray(state)
  assistants.sort((a1,a2) => a1.firstName+' '+a1.lastName < a2.firstName+' '+a2.lastName ? -1 : 1)

  const { city } = selEmployer(state)
  const initialValues = {
    assistant: assistants.length > 0 ? assistants[0].id : undefined
  }
  if(city === 'Espoo') {
    let m = moment().add(-7, 'days')
    initialValues.year = m.year()+''
    initialValues.month = m.month()+''
    initialValues.range = '0' //todo: constant
  } else {
    initialValues.startDate = moment().add(-1, 'months').format('DD.MM.YYYY')
    initialValues.endDate = moment().format('DD.MM.YYYY')
  }

  return {
    polling: selIsPolling(state),
    submitting: selIsFormSubmitting(reduxFormName)(state),
    downloadLink: selDownloadLink(state),
    downloadable: selIsDownloadable(state),
    assistants,
    enableReinitialize: true,
    city,
    initialValues,
    msg: {...getTranslate(state.locale)([
      'reporting.assistant','reporting.startDate','reporting.endDate','reporting.startBtn','reporting.downloadBtn',
      'reporting.year','reporting.month','reporting.range','reporting.range0','reporting.range1','reporting.range2',
    ])}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => dispatchForm(dispatch, requestReport, values),
    onAssistantChange: assistant => {
      dispatch(resetReportForm())
      if(!assistant.exportedUntil)
        return
      let startDate = moment(assistant.exportedUntil).add(1, 'days').format('DD.MM.YYYY')
      dispatch(actions.change(reduxFormName, 'startDate', startDate))
    },
    onStartDownload: () => {
      dispatch(resetReportForm())
      dispatch(reset(reduxFormName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm)
