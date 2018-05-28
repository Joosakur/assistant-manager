import React from 'react'
import PropTypes from 'prop-types'
import {Form, Label} from 'semantic-ui-react'
import moment from 'moment'
import Datetime from "react-datetime"


const FormDateFieldWithErrorLabel = (props) => {
  let {input, label, placeholder, isValidDate, meta: {error}} = props
  return (
    <Form.Field error={error}>
      <label style={{float: 'left'}}>{label}</label>
      {error && <Label pointing='left' basic horizontal color='red'>{error}</Label>}
      <Datetime
        value = {input.value}
        onChange={(value) => input.onChange(typeof value === "string" ? value : value.format('DD.MM.YYYY'))}
        timeFormat={false}
        closeOnSelect
        isValidDate={isValidDate || (() => true)}
        inputProps={{
          type: "text",
          placeholder: placeholder || moment().format("DD.MM.YYYY")
        }}
      />
    </Form.Field>
  )
}

FormDateFieldWithErrorLabel.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isValidDate: PropTypes.func,
  meta: PropTypes.shape({
    error: PropTypes.string
  })
}

export default FormDateFieldWithErrorLabel
