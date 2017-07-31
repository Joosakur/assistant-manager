import React from 'react';
import PropTypes from 'prop-types';
import {Form, Icon, Radio} from 'semantic-ui-react';

const FormToggle = (props) => {
  let {input, label, icon} = props;
  console.log(input);
  return (
    <Form.Field>
      <Radio
             toggle
             checked={input.value}
             onChange={(event, data) => {
               event.preventDefault();
               input.onChange(data.checked);
             }}
             label={<label>{icon && <Icon size="large" name={icon}/>}{label}</label>}/>
    </Form.Field>
  );
};

FormToggle.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string
};

export default FormToggle;
