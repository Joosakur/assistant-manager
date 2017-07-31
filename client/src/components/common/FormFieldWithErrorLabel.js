import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Label} from 'semantic-ui-react';

const FormFieldWithErrorLabel = (props) => {
  let {input, label, placeholder, type, meta: {error}} = props;
  return (
    <Form.Field error={error}>
      <label style={{float: 'left'}}>{label}</label>
      {error && <Label pointing="left" basic horizontal color="red">{error}</Label>}
      <Input {...input} placeholder={placeholder} type={type} error={error} fluid/>
    </Form.Field>
  );
};

FormFieldWithErrorLabel.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string
  })
};

export default FormFieldWithErrorLabel;
