import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Divider} from 'semantic-ui-react';
import {reduxForm, Field} from 'redux-form';
import FormFieldWithErrorLabel from "../common/FormFieldWithErrorLabel";
import {email, maxLength, minLength, required} from "../../utils/validationConstraints";
import ReduxFormRecaptcha from "../common/ReduxFormRecaptcha";

const RegistrationForm = (props) => {
  let {handleSubmit, error, loading} = props;

  return (
    <Form error={!!error} onSubmit={handleSubmit} >
      <Field name="email" component={FormFieldWithErrorLabel} type="text" label="Email" isRequired
             validate={[required, email, maxLength(64)]}/>
      <Field name="password" component={FormFieldWithErrorLabel} type="password" label="Password" isRequired
             validate={[required, minLength(8), maxLength(30)]}/>
      <Field name="firstName" component={FormFieldWithErrorLabel} type="text" label="First Name" isRequired
             validate={[required, maxLength(20)]}/>
      <Field name="lastName" component={FormFieldWithErrorLabel} type="text" label="Last Name" isRequired
             validate={[required, maxLength(30)]}/>
      <Field name="captcha" component={ReduxFormRecaptcha} explicit={true}/>
      <Divider hidden/>
      <Button type="submit" disabled={loading} positive size="huge" fluid>Sign up now!</Button>
    </Form>
  );
};

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'RegistrationForm',
  fields: ['email','password','firstName','lastName','captcha'],
  asyncBlurFields: ['email'],

})(RegistrationForm);

