import {connect} from 'react-redux';
import {ownPropsToArray} from "../utils/jsUtils";
import moment from "moment";
import ReportForm from "../components/reporting/ReportForm";
import {actions} from "redux-form";
import {postReport} from "../thunks/reportingThunk";
import {resetReport} from "../actions/reportActions";

const mapStateToProps = state => {

  let assistants = ownPropsToArray(state.entities.assistants);
  assistants.sort((a1,a2) => a1.firstName+" "+a1.lastName < a2.firstName+" "+a2.lastName ? -1 : 1)

  return {
    polling: state.reporting.polling,
    submitting: state.reporting.submitting,
    downloadLink: state.reporting.downloadLink,
    downloadable: state.reporting.downloadLink !== undefined,
    assistants,
    enableReinitialize: true,
    initialValues: {
      assistant: assistants.length > 0 ? assistants[0].id : undefined,
      startDate: moment().add(-1, "months").format("DD.MM.YYYY"),
      endDate: moment().format("DD.MM.YYYY")
    }
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
    }
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
