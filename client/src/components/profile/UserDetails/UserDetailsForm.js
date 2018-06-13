import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Divider} from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'
import moment from "moment/moment"

import FormFieldWithErrorLabel from "../../common/FormFieldWithErrorLabel"
import FormCheckbox from "../../common/FormCheckbox"
import {dateBefore, maxLength, required} from "../../../utils/validationConstraints"
import FormDropdownField from "../../common/FormDropdownField"
import cities from "../../../constants/cities"
import s from "../../../localization"

export const reduxFormName = 'UserDetailsForm'

const getCityOptions = () => {
  return Object.values(cities).map(city => {return {key: city, text: city, value: city}})
}

const UserDetailsForm = ({handleSubmit, submitting, pristine}) => (
  <Fragment>
    <h1>{s.profile.userDetails.title}</h1>

    <Form id='UserDetailsForm' onSubmit={handleSubmit} >
      <Field name='firstName' component={FormFieldWithErrorLabel} type='text' label={s.profile.userDetails.firstName}
             isRequired validate={[required, maxLength(20)]} autocomplete='given-name' />
      <Field name='lastName' component={FormFieldWithErrorLabel} type='text' label={s.profile.userDetails.lastName}
             isRequired validate={[required, maxLength(30)]} autocomplete='family-name' />
      <Field name='birthday' component={FormFieldWithErrorLabel} type='text' label={s.profile.userDetails.birthday}
             placeholder='31.12.1980'
             isRequired validate={[required, dateBefore('D.M.YYYY', moment().add(-18, 'years'))]}/>
      <Field name='city' component={FormDropdownField} label={s.profile.userDetails.city}
             options={getCityOptions()} />
      <Field name='hetaMember' component={FormCheckbox}
             label={<span>{s.profile.userDetails.cbox1a}<a href='http://www.heta-liitto.fi/' target='_blank'>{s.profile.userDetails.cbox1b}</a>.</span>}
      />
      <Divider hidden/>
      <Button type='submit' loading={submitting}
              disabled={submitting || pristine}
              positive size='huge' fluid>
        {s.profile.userDetails.submitBtn}
      </Button>
    </Form>
  </Fragment>
)

UserDetailsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired
}

export default reduxForm({
  form: reduxFormName
})(UserDetailsForm)
