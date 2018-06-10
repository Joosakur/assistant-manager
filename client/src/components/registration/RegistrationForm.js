import React from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Divider} from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'
import moment from 'moment'

import FormFieldWithErrorLabel from '../common/FormFieldWithErrorLabel'
import ReduxFormRecaptcha from '../common/ReduxFormRecaptcha'
import FormCheckbox from '../common/FormCheckbox'
import FormDropdownField from '../common/FormDropdownField'
import {dateBefore, email, maxLength, minLength, required} from '../../utils/validationConstraints'
import cities from '../../constants/cities'
import s from "../../localization"

export const reduxFormName = 'RegistrationForm'

const getCityOptions = () => {
  return Object.values(cities).map(city => {return {key: city, text: city, value: city}})
}

class RegistrationForm extends React.Component {
  render() {
    const {handleSubmit, submitting} = this.props
    const cityOptions = getCityOptions()

    return (
      <Form id='RegistrationForm' onSubmit={handleSubmit} >
        <Field name='email' component={FormFieldWithErrorLabel} type='text' label={s.signUp.email}
               isRequired validate={[required, email, maxLength(64)]} autocomplete='email' />
        <Field name='password' component={FormFieldWithErrorLabel} type='password' label={s.signUp.password}
               isRequired validate={[required, minLength(8), maxLength(30)]} />
        <Field name='firstName' component={FormFieldWithErrorLabel} type='text' label={s.signUp.firstName}
               isRequired validate={[required, maxLength(20)]} autocomplete='given-name' />
        <Field name='lastName' component={FormFieldWithErrorLabel} type='text' label={s.signUp.lastName}
               isRequired validate={[required, maxLength(30)]} autocomplete='family-name' />
        <Field name='birthday' component={FormFieldWithErrorLabel} type='text' label={s.signUp.birthday}
               placeholder='31.12.1980'
               isRequired validate={[required, dateBefore('D.M.YYYY', moment().add(-18, 'years'))]}/>
        <Field name='city' component={FormDropdownField} label={s.signUp.city}
               options={cityOptions} />
        <Field name='hetaMember' component={FormCheckbox}
               label={<span>{s.signUp.cbox1a}<a href='http://www.heta-liitto.fi/' target='_blank'>{s.signUp.cbox1b}</a>.</span>}
        />
        <Field name='agreement' component={FormCheckbox}
               label={<span>{s.signUp.cbox2a}<a href='/terms-and-conditions-v1.pdf' target='_blank'>{s.signUp.cbox2b}</a>.</span>}
               isRequired validate={required}/>

        <Field name='captcha' component={ReduxFormRecaptcha} explicit={true}/>
        <Divider hidden/>
        <Button type='submit' loading={submitting}
                disabled={submitting}
                positive size='huge' fluid>
          {s.signUp.submitBtn}
        </Button>
      </Form>
    )
  }
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: reduxFormName,
  asyncBlurFields: ['email']
})(RegistrationForm)

