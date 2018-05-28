import React from 'react'
import PropTypes from 'prop-types'
import {Form, Icon, Radio} from 'semantic-ui-react'

const FormToggle = (props) => {
  let {input, label, icon} = props

  if(typeof icon === 'string')
    icon = <Icon size='large' name={icon}/>

  return (
    <Form.Field>
      <Radio
             toggle
             checked={!!input.value}
             onChange={(event, data) => {
               event.preventDefault()
               input.onChange(data.checked)
             }}
             label={<label>{icon}{label}</label>}/>
    </Form.Field>
  )
}

FormToggle.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default FormToggle
