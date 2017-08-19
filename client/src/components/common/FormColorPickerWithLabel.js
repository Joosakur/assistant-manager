import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';
import {CompactPicker} from 'react-color';

const FormColorPickerWithLabel = (props) => {
  let {input, label} = props;
  return (
    <Form.Field>
      <label>{label}</label>
      <CompactPicker {...input} color={input.value} onChangeComplete={(color) => input.onChange(color.hex)}/>
    </Form.Field>
  );
};

FormColorPickerWithLabel.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default FormColorPickerWithLabel;
