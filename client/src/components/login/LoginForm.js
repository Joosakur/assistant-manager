import React from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Container, Divider, Message} from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'
import FormFieldWithErrorLabel from "../common/FormFieldWithErrorLabel"

const LoginForm = (props) => {
  let {handleSubmit, error, loading, translate} = props

  return (
    <Container className="narrow">
      <Form error={!!error} onSubmit={handleSubmit}>
        <Field name="email" component={FormFieldWithErrorLabel} type="text" label={translate('signIn.email')}/>
        <Field name="password" component={FormFieldWithErrorLabel} type="password" label={translate('signIn.password')}/>
        {error && <Message error>{error}</Message>}
        <Divider hidden/>
        <Button type="submit" disabled={loading} loading={loading} fluid size="big" positive>{translate('signIn.submit')}</Button>
      </Form>
    </Container>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'RegistrationForm'
})(LoginForm)

