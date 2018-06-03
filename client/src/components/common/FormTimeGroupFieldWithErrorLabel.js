import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from 'semantic-ui-react'
import {Field} from 'redux-form'
import FormFieldWithErrorLabel from './FormFieldWithErrorLabel'
import {maxValue, minValue, number, required} from '../../utils/validationConstraints'

const FormTimeGroupWithErrorLabel = (props) => {
  let {name, label} = props
  return (
    <Grid columns='equal'>
      <Grid.Row verticalAlign='bottom'>
        <Grid.Column>
          <Field name={name+'Hours'} placeholder='h (00-23)' component={FormFieldWithErrorLabel} type='text' label={label}
                 validate={[required, number, minValue(0), maxValue(23)]}/>
        </Grid.Column>
        <Grid.Column>
          <Field name={name+'Minutes'} placeholder='min (00-59)' component={FormFieldWithErrorLabel} type='text'
                 validate={[required, number, minValue(0), maxValue(59)]}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  )
}

FormTimeGroupWithErrorLabel.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default FormTimeGroupWithErrorLabel
