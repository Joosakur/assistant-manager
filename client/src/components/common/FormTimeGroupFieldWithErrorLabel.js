import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Label} from 'semantic-ui-react';

const FormFieldWithErrorLabel = (props) => {
  let {input, label, type, meta: {error}} = props;
  return (
    <Form.Field error={error}>
      <label style={{float: 'left'}}>{label}</label>
      {error && <Label pointing="left" basic horizontal color="red">{error}</Label>}
      <Input {...input} placeholder={label} type={type} error={error} fluid/>
    </Form.Field>
  );
};

export default FormFieldWithErrorLabel;
