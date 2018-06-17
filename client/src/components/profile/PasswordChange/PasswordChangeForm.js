import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Divider} from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'

import FormFieldWithErrorLabel from "../../common/FormFieldWithErrorLabel"
import {maxLength, minLength, required, passwordMatch} from "../../../utils/validationConstraints"
import s from "../../../localization"

export const reduxFormName = 'PasswordChangeForm'

const PasswordChangeForm = ({handleSubmit, submitting, pristine, newPassword}) => (
  <Fragment>
    <h1>{s.profile.passwordChange.title}</h1>

    <Form id='UserDetailsForm' onSubmit={handleSubmit} >
      <Field name='oldPassword' component={FormFieldWithErrorLabel} type='password' isRequired
             label={s.profile.passwordChange.oldPassword} validate={[required]} />
      <Field name='newPassword' component={FormFieldWithErrorLabel} type='password' isRequired
             label={s.profile.passwordChange.newPassword} validate={[required, minLength(8), maxLength(30)]} />
      <Field name='confirmPassword' component={FormFieldWithErrorLabel} type='password' isRequired
             label={s.profile.passwordChange.confirmPassword} validate={[required, passwordMatch(newPassword)]} />
      <Divider hidden/>
      <Button type='submit' loading={submitting}
              disabled={submitting || pristine}
              positive size='huge' fluid>
        {s.profile.passwordChange.submitBtn}
      </Button>
    </Form>
  </Fragment>
)

PasswordChangeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  newPassword: PropTypes.string.isRequired // current value of the newPassword field
}

export default reduxForm({
  form: reduxFormName
})(PasswordChangeForm)
