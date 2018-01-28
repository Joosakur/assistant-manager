import React from 'react'
import PropTypes from 'prop-types'
import {Checkbox, Form, Icon, Label} from 'semantic-ui-react'

const FormCheckbox = (props) => {
  let {input, label, isRequired, meta: {touched, error}} = props
  return (
    <Form.Field error={error && touched}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Checkbox
          checked={input.checked}
          onChange={(event, data) => {
            event.preventDefault()
            input.onChange(data.checked)
          }}
          style={{marginRight: '6px'}}
        />
        <div>{label} {isRequired && <sup><Icon name="asterisk" size="small"/></sup>}</div>
        {error && touched && <Label pointing="left" basic horizontal color="red">{error}</Label>}
      </div>


    </Form.Field>
  )
}

FormCheckbox.propTypes = {
  input: PropTypes.shape({
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isRequired: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  })
}

export default FormCheckbox
