import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Label, Grid, GridRow, GridColumn} from 'semantic-ui-react';
import {reduxForm, Field} from 'redux-form';

const renderField = (props) => {
  let {input, label, type, meta: {error}} = props;
  return (
    <Form.Field error={error}>
      <label style={{float: 'left'}}>{label}</label>
      {error && <Label pointing="left" basic horizontal color="red">{error}</Label>}
      <Input {...input} placeholder={label} type={type} error={error} fluid/>
    </Form.Field>
  );
};

const RegistrationForm = (props) => {
  let {handleSubmit, error, loading} = props;

  return (
    <Form error={error} onSubmit={handleSubmit}>
      <Field name="email" component={renderField} type="text" label="Email" error={error}/>
      <Field name="password" component={renderField} type="password" label="Password" error={error}/>
      <Field name="firstName" component={renderField} type="text" label="First Name" error={error }/>
      <Field name="lastName" component={renderField} type="text" label="Last Name" error={error}/>
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

