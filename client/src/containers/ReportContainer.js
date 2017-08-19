import {connect} from 'react-redux';
import {ownPropsToArray} from "../utils/jsUtils";
import moment from "moment";
import ReportForm from "../components/reporting/ReportForm";
import {actions} from "redux-form";
import {postReport} from "../thunks/reportingThunk";
import {resetReport} from "../actions/reportActions";

const mapStateToProps = state => {

  return {
    polling: state.reporting.polling,
    submitting: state.reporting.submitting,
    downloadLink: state.reporting.downloadLink,
    downloadable: state.reporting.downloadLink !== undefined,
    assistants: ownPropsToArray(state.entities.assistants),
    enableReinitialize: true,
    initialValues: {
      assistant:  undefined,
      startDate: undefined,
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
    }
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
