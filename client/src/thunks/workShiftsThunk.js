import {API, SELF} from '../constants/urls'
import {push} from 'react-router-redux'
import {toastr} from 'react-redux-toastr'
import axios from 'axios'
import {formErrorFromApiError, generalErrorFromApiError} from "../utils/errorUtils"
import {
  deleteWorkShiftBegin,
  deleteWorkShiftError,
  deleteWorkShiftSuccess,
  endWorkShiftEdit,
  getWorkShiftsBegin, getWorkShiftsError, listWorkShiftsSuccess,
  submitWorkShiftBegin, submitWorkShiftError, submitWorkShiftSuccess
} from "../actions/api/workShiftActions"
import SubmissionError from "redux-form/es/SubmissionError"
import moment from "moment"

export function getWorkShifts(fromDate, toDate, assistantId) {
  return function (dispatch, getState) {
    dispatch(getWorkShiftsBegin())
    if(!assistantId && !getState().login.authenticated) {
      dispatch(push(SELF.login))
      toastr.error("Error", "Please login")
    }

    return axios.get(API.origin+API.workShifts, {
      headers: {'Authorization': getState().login.token},
      params: {'from': fromDate, 'to': toDate, assistantId}
    })
      .then((response) => {
        dispatch(listWorkShiftsSuccess(response.data))
      })
      .catch(e => {
        let error = generalErrorFromApiError(e)
        dispatch(getWorkShiftsError())
        toastr.error("Error", error)
      })
  }
}

export function deleteWorkShift(id) {
  return function (dispatch, getState) {
    dispatch(deleteWorkShiftBegin())

    return axios({
      url: API.origin+API.workShifts+"/"+id,
      method: 'delete',
      headers: {'Authorization': getState().login.token}
    })
      .then(() => {
        dispatch(deleteWorkShiftSuccess(id))
        dispatch(endWorkShiftEdit())
        toastr.success('Deleted')
      })
      .catch(e => {
        let error = formErrorFromApiError(e)
        dispatch(deleteWorkShiftError(error))
        toastr.error("Error", error._error)
      })
  }
}

function sendWorkShift(body, target) {
  return function (dispatch, getState) {
    dispatch(submitWorkShiftBegin())
    let url = API.origin+API.workShifts
    let method = 'post'
    if(target) {
      url += "/"+target
      method = 'put'
    }
    return axios({
      url,
      method,
      headers: {'Authorization': getState().login.token},
      data: body,
      withCredentials: true
    })
      .then((response) => {
        dispatch(submitWorkShiftSuccess(response.data))
        dispatch(endWorkShiftEdit())
        toastr.success('Saved')
      })
      .catch(e => {
        let error = formErrorFromApiError(e)
        dispatch(submitWorkShiftError(error))
        toastr.error("Error", error._error)
        throw new SubmissionError(error)
      })
  }
}

export function sendWorkShiftForm(form) {
  let start = moment(form.startDate, "D.M.YYYY").hours(form.startTimeHours).minutes(form.startTimeMinutes)
  let end = moment(form.startDate, "D.M.YYYY")
  let startTimeHours = parseInt(form.startTimeHours)
  let startTimeMinutes = parseInt(form.startTimeMinutes)
  let endTimeHours = parseInt(form.endTimeHours)
  let endTimeMinutes = parseInt(form.endTimeMinutes)

  if(endTimeHours === 24 && endTimeMinutes === 0) {
    end.add(1, "days").hours(0).minutes(0)
  }
  else {
    end.hours(endTimeHours).minutes(endTimeMinutes)
    if(endTimeHours < startTimeHours ||
      (endTimeHours === startTimeHours && endTimeMinutes < startTimeMinutes))
      end.add(1, "days")
  }

  let body = {
    assistantId: form.assistant === "Unassigned" ? null : form.assistant,
    start: start.format("YYYY-MM-DDTHH:mm:ss"),
    end: end.format("YYYY-MM-DDTHH:mm:ss"),
    sick: form.sick
  }

  return sendWorkShift(body, form.target)
}

export function pasteDay(dateToPaste) {
  return function (dispatch, getState) {
    let dateToCopy = moment(getState().schedule.copiedDay)
    return axios({
      url: API.origin + API.workShifts + "/copy-day",
      method: 'post',
      headers: {'Authorization': getState().login.token},

      params: {
        from: dateToCopy.format("YYYY-MM-DD"),
        to: dateToPaste.format("YYYY-MM-DD")
      }
    })
      .then((response) => {
        response.data.forEach((workShift) => {
          dispatch(submitWorkShiftSuccess(workShift))
        })
        toastr.success('Saved')
      })
      .catch((e) => {
        console.error(e)
        toastr.error("Copying failed")
      })
  }
}
