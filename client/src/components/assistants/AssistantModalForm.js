import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Icon, Label, Modal} from "semantic-ui-react";
import {reduxForm, Field} from 'redux-form';
import FormToggle from "../common/FormToggle";
import FormFieldWithErrorLabel from "../common/FormFieldWithErrorLabel";
import FormColorPickerWithLabel from "../common/FormColorPickerWithLabel";
import {dateBefore, maxLength, required} from "../../utils/validationConstraints";
import moment from "moment";

class AssistantModalForm extends React.Component {

  constructor(props, context) {
    super(props, context);
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
                <Field name="firstName" component={FormFieldWithErrorLabel} type="text" label="First name" placeholder="First name" isRequired
                       validate={[required, maxLength(20)]}/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <Field name="lastName" component={FormFieldWithErrorLabel} type="text" label="Last name" placeholder="Last name" isRequired
                       validate={[required, maxLength(30)]}/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <Field name="nickName" component={FormFieldWithErrorLabel} type="text" label="Nick name" placeholder="Nick name"
                       validate={[maxLength(12)]}/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <Field name="birthday" component={FormFieldWithErrorLabel} type="text" label="Birthday" placeholder="31.12.1980" isRequired
                       validate={[required, dateBefore('D.M.YYYY', moment().add(-16, 'years'))]}/>
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
          <Button form="AssistantForm" type="submit" loading={this.props.submitting} disabled={this.props.pristine && this.props.submitting} positive>Save</Button>
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
  submitting: PropTypes.bool.isRequired,
  shortName: PropTypes.string,
  whiteText: PropTypes.bool,
  backgroundColor: PropTypes.string
};

export default reduxForm({
  form: 'AssistantForm'
})(AssistantModalForm);
