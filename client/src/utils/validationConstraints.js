import moment from "moment";

export const required = value => value ? undefined : 'Required';
export const minLength = min => value =>
  !value || value.length < min ? `Must be at least ${min} characters` : undefined;
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
export const maxValue = max => value =>
  value && value > max ? `Must be ${max} or less` : undefined;
export const email = value =>
  value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ?
    'Invalid email address' : undefined;
export const date = format => value =>
  value && !moment(value, format, true).isValid() ? 'Invalid date' : undefined;
export const dateBefore = (format, before) => value => {
  let invalid = date(format)(value);
  if(invalid) return invalid;
  return value && !moment(value, format, true).isBefore(before) ? `Should be before ${before.format(format)}` : undefined;
};
export const dateAfter = (format, after) => value => {
  let invalid = date(format)(value);
  if(invalid) return invalid;
  return value && !moment(value, format, true).isAfter(after) ? `Should be after ${after.format(format)}` : undefined;
};
export const dateBetween = (format, before, after) => value => {
  let invalid = date(format)(value);
  if(invalid) return invalid;
  return value && !moment(value, format, true).isBetween(before,after) ? `Should be between ${before.format(format)} and ${after.format(format)}` : undefined;
};

