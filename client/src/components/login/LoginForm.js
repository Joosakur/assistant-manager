import React from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Container, Divider, Message} from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'

import FormFieldWithErrorLabel from '../common/FormFieldWithErrorLabel'
import s from "../../localization"

export const reduxFormName = 'LoginForm'

const LoginForm = ({handleSubmit, error, submitting}) => {
  return (
    <Container className='narrow'>
      <Form error={!!error} onSubmit={handleSubmit}>
        <Field name='email' component={FormFieldWithErrorLabel} type='text' label={s.signIn.email}/>
        <Field name='password' component={FormFieldWithErrorLabel} type='password' label={s.signIn.password}/>
        {error && <Message error>{error}</Message>}

        <Divider hidden/>
        <Button type='submit' disabled={submitting} loading={submitting} fluid size='big' positive>{s.signIn.submitBtn}</Button>
      </Form>
    </Container>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: reduxFormName
})(LoginForm)

