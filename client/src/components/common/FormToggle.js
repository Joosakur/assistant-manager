import React from 'react';
import PropTypes from 'prop-types';
import {Divider, Dropdown, Form, Icon, Radio} from 'semantic-ui-react';
import Container from "semantic-ui-react/dist/es/elements/Container/Container";

const FormToggle = (props) => {
  let {input, label, options} = props;
  return (
    <Form.Field>
      <label style={{float: 'left'}}>{label}</label>
      <Container fluid style={{float:'left', clear: 'both'}}>
        <Radio toggle value={input.value} onChange={(param,data) => input.onChange(data.value)}/>
        <Icon name="doctor" size="big"/>
      </Container>

    </Form.Field>
  );
};

export default FormToggle;
