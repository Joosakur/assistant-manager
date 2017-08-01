import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Icon, Label, Modal} from "semantic-ui-react";
import {reduxForm, Field} from 'redux-form';
import FormDateFieldWithErrorLabel from "../common/FormDateFieldWithErrorLabel";
import FormDropdownField from "../common/FormDropdownField";
import FormTimeGroupWithErrorLabel from "../common/FormTimeGroupFieldWithErrorLabel";
import FormToggle from "../common/FormToggle";
import FormFieldWithErrorLabel from "../common/FormFieldWithErrorLabel";
import moment from "moment";
import FormColorPickerWithLabel from "../common/FormColorPickerWithLabel";

class AssistantModalForm extends React.Component {

  constructor(props, context) {
    console.log(props);
    super(props, context);
  }

  componentWillReceiveProps(newProps) {
    console.log("received");
    console.log(newProps);
  }

  render() {
    return (
      <Modal dimmer="inverted" size="small" open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header style={{height: "70px"}}>
          {this.props.target ? <span>Edit</span> : <span>Create new</span>}
          <Label style={{float: "right", width: "150px", overflow: 'hidden', whiteSpace: 'no-wrap',
            backgroundColor: this.props.backgroundColor, color: this.props.whiteText ? '#ffffff' : '#000000'}} size="large">
            <Icon name="user" size="large"/> {this.props.shortName}
          </Label>
        </Modal.Header>
        <Modal.Content>
          <Form id="AssistantForm" onSubmit={this.props.handleSubmit}>
            <Grid columns="equal">
              <Grid.Column computer="8" tablet="8" mobile="16">
                <Field name="firstName" component={FormFieldWithErrorLabel} type="text" label="First name" placeholder="First name" isRequired/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <Field name="lastName" component={FormFieldWithErrorLabel} type="text" label="Last name" placeholder="Last name" isRequired/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <Field name="nickName" component={FormFieldWithErrorLabel} type="text" label="Nick name" placeholder="Nick name"/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <Field name="birthday" component={FormFieldWithErrorLabel} type="text" label="Birthday" placeholder="31.12.1980" isRequired/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <Field name="backgroundColor" component={FormColorPickerWithLabel} label="Background color"/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16" verticalAlign="top">
                <Field name="whiteText" component={FormToggle} label="Invert text color" icon="font"/>
              </Grid.Column>
            </Grid>
            <Field component="input" type="hidden" name="target"/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.props.onClose} loading={this.props.submitting} disabled={this.props.submitting}>Cancel</Button>
          <Button form="AssistantForm" type="submit" loading={this.props.submitting} disabled={this.props.submitting} positive>Save</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AssistantModalForm.propTypes = {
  open: PropTypes.bool.isRequired,
  target: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'AssistantForm'
})(AssistantModalForm);
