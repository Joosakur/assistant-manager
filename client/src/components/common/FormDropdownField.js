import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

const FormDropdownField = (props) => {
  let {input, label, options, onChangeExtra} = props;
  return (
    <Form.Field>
      <label style={{float: 'left'}}>{label}</label>
      <Form.Select {...input}
                options={options}
                value={input.value}
                onChange={(param,data) => {
                  input.onChange(data.value);
                  onChangeExtra && onChangeExtra(data.value);
                }}
                placeholder={label}
                fluid/>
    </Form.Field>
  );
};

FormDropdownField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChangeExtra: PropTypes.func,
};

export default FormDropdownField;
