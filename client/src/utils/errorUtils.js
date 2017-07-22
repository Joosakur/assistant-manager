export const formErrorFromApiError = e => {
  let error = {};
  if(!e.response.data)
    error = {_error: "Connection error"};
  else {
    let fieldErrors = e.response.data.fieldErrors;
    if(fieldErrors) {
      for(let fieldError of fieldErrors) {
        error[fieldError.field] = fieldError.message;
      }
      error._error = "Validation failed";
    }

    let msg = e.response.data.message;
    if(msg)
      error._error = msg;
  }
  return error;
};

export const generalErrorFromApiError = e => {
  if(!e.response.data)
    return "Connection error";

  let msg = e.response.data.message;
  return msg ? msg : "Unknown error";
};

