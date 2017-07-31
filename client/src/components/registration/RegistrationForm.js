import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'semantic-ui-react';
import {reduxForm, Field} from 'redux-form';
import FormFieldWithErrorLabel from "../common/FormFieldWithErrorLabel";

const RegistrationForm = (props) => {
  let {handleSubmit, error, loading} = props;

  return (
    <Form error={error} onSubmit={handleSubmit}>
      <Field name="email" component={FormFieldWithErrorLabel} type="text" label="Email" error={error}/>
      <Field name="password" component={FormFieldWithErrorLabel} type="password" label="Password" error={error}/>
      <Field name="firstName" component={FormFieldWithErrorLabel} type="text" label="First Name" error={error}/>
      <Field name="lastName" component={FormFieldWithErrorLabel} type="text" label="Last Name" error={error}/>
      <Button type="submit" disabled={loading} positive>Submit</Button>
    </Form>
  );
};

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'RegistrationForm'
})(RegistrationForm);

