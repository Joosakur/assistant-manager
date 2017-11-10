import {API} from '../constants/urls';
import {toastr} from 'react-redux-toastr';
import {formErrorFromApiError} from '../utils/errorUtils';
import {SubmissionError} from 'redux-form';
import axios from 'axios';
import {
  getReportError, getReportSuccess, postReportBegin, postReportError,
  postReportSuccess
} from "../actions/reportActions";
import moment from "moment";

function startPolling(id) {
  return function (dispatch, getState) {
    let retries = 20;
    let pollDelay = 1500;

    function poll() {
      retries--;
      if(retries === 0) {
        dispatch(getReportError("Export timed out"));
        return;
      }

      axios.get(API.origin+API.reporting+"/"+id, {headers: {'Authorization': getState().login.token}})
        .then(response => {
          console.log(response);
          let status = response.data.status;
          if(status === "ERROR")
            dispatch(getReportError("Export failed"));
          else if(status === "COMPLETED")
            dispatch(getReportSuccess(response.data.downloadLink));
          else if(status === "RECEIVED")
            setTimeout(poll, pollDelay);
        })
        .catch(error => {
          console.log(error);
        });
    }

    poll();
  };

}

export function postReport(report) {
  return function (dispatch, getState) {
    dispatch(postReportBegin());

    let startDate, endDate;

    if(report.year && report.month) {
      //first day of the month
      startDate = moment().year(report.year).month(report.month).date(1);
      //last day of the month = first day of the next month minus one day
      endDate = moment().year(report.year).month(report.month).date(1).add(1,"months").add(-1, "days");

      if(report.range === "1") {
        endDate = endDate.date(15);
      }
      else if(report.range === "2") {
        startDate = startDate.date(16);
      }
    }
    else {
      startDate = moment(report.startDate, "D.M.YYYY").format("YYYY-MM-DD");
      endDate = moment(report.endDate, "D.M.YYYY").format("YYYY-MM-DD");
    }

    let body = {
      assistantId: report.assistant,
      from: startDate,
      to: endDate
    };

    return axios.post(API.origin+API.reporting, body, {headers: {'Authorization': getState().login.token}})
      .then((response) => {
        let exportId = response.data.id;
        dispatch(postReportSuccess(exportId));
        dispatch(startPolling(exportId));
      })
      .catch(e => {
        let error = formErrorFromApiError(e);
        dispatch(postReportError(error));
        toastr.error("Error", error._error);
        throw new SubmissionError(error);
      });
  };
}
