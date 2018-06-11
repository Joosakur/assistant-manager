import moment from 'moment'

import s from '../localization'

export const required = value => value ? undefined : s.validation.required

export const minLength = min => value =>
  !value || value.length < min ? s.formatString(s.validation.minLength, min) : undefined

export const maxLength = max => value =>
  value && value.length > max ? s.formatString(s.validation.maxLength, max) : undefined

export const number = value => value && isNaN(Number(value)) ? s.validation.number : undefined

export const minValue = min => value =>
  value && value < min ? s.formatString(s.validation.minValue, min) : undefined

export const maxValue = max => value =>
  value && value > max ? s.formatString(s.validation.maxValue, max) : undefined

export const email = value =>
// eslint-disable-next-line no-useless-escape
  value && !/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ?
    s.validation.email : undefined

export const date = format => value =>
  value && !moment(value, format, true).isValid() ? s.formatString(s.validation.date, format) : undefined

export const dateBefore = (format, before) => value => {
  let invalid = date(format)(value)
  if(invalid) return invalid
  return value && !moment(value, format, true).isBefore(before)
    ? s.formatString(s.validation.dateBefore, before.format(format)) : undefined
}

export const dateAfter = (format, after) => value => {
  let invalid = date(format)(value)
  if(invalid) return invalid
  return value && !moment(value, format, true).isAfter(after)
    ? s.formatString(s.validation.dateAfter, after.format(format)) : undefined
}

export const dateBetween = (format, before, after) => value => {
  let invalid = date(format)(value)
  if(invalid) return invalid
  return value && !moment(value, format, true).isBetween(before,after) ?
    s.formatString(s.validation.dateBetween, before.format(format), after.format(format)) : undefined
}
