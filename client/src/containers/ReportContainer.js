import {connect} from 'react-redux';
import {ownPropsToArray} from "../utils/jsUtils";
import moment from "moment";
import ReportForm from "../components/reporting/ReportForm";
import {actions, reset} from "redux-form";
import {postReport} from "../thunks/reportingThunk";
import {resetReport} from "../actions/api/reportActions";
import { getTranslate } from 'react-localize-redux';

const mapStateToProps = state => {

  let assistants = ownPropsToArray(state.entities.assistants);
  assistants.sort((a1,a2) => a1.firstName+" "+a1.lastName < a2.firstName+" "+a2.lastName ? -1 : 1);

  let city = state.login.userData.city;
  let initialValues = {
    assistant: assistants.length > 0 ? assistants[0].id : undefined
  };
  if(city === "Espoo") {
    let m = moment().add(-7, "days");
    initialValues.year = m.year()+"";
    initialValues.month = m.month()+"";
    initialValues.range = "0";
  } else {
    initialValues.startDate = moment().add(-1, "months").format("DD.MM.YYYY");
    initialValues.endDate = moment().format("DD.MM.YYYY")
  }

  return {
    polling: state.reporting.polling,
    submitting: state.reporting.submitting,
    downloadLink: state.reporting.downloadLink,
    downloadable: state.reporting.downloadLink !== undefined,
    assistants,
    enableReinitialize: true,
    city,
    initialValues,
    msg: {...getTranslate(state.locale)([
      'reporting.assistant','reporting.startDate','reporting.endDate','reporting.startBtn','reporting.downloadBtn',
      'reporting.year','reporting.month','reporting.range','reporting.range0','reporting.range1','reporting.range2',
    ])}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => dispatch(postReport(values)),
    onAssistantChange: (assistant) => {
      dispatch(resetReport());
      if(!assistant.exportedUntil)
        return;
      let startDate = moment(assistant.exportedUntil).add(1, "days").format("DD.MM.YYYY");
      dispatch(actions.change("ReportForm", "startDate", startDate));
    },
    onStartDownload: () => {
      dispatch(resetReport());
      dispatch(reset('ReportForm'));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
