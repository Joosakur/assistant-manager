import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Icon, Modal} from "semantic-ui-react";
import {reduxForm, Field} from 'redux-form';
import FormDateFieldWithErrorLabel from "../common/FormDateFieldWithErrorLabel";
import FormDropdownField from "../common/FormDropdownField";
import FormTimeGroupWithErrorLabel from "../common/FormTimeGroupFieldWithErrorLabel";
import FormToggle from "../common/FormToggle";
import moment from "moment";
import {dateBetween, required} from "../../utils/validationConstraints";

class ScheduleModalForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      assistantArray: this.getAssistantOptions(props.assistants)
    };
  }

  componentWillReceiveProps(nextProps) {
    let nextState = Object.assign({}, this.state, {assistantArray: this.getAssistantOptions(nextProps.assistants)});
    this.setState(nextState);
  }

  getAssistantOptions(assistants) {
    let assistantArray = assistants ? assistants
      .filter(a => a.active)
      .map(a => {return {key: a.id, text: a.firstName + " " + a.lastName, value: a.id};})
    : [];
    assistantArray.unshift({key: "Unassigned", value: "Unassigned", text: "Unassigned"});
    return assistantArray;
  }

  render() {
    return (
      <Modal dimmer="inverted" size="small" open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>{this.props.target ? <span>Edit</span> : <span>Create new</span>}</Modal.Header>
        <Modal.Content>
          <Form id="WorkShiftForm" onSubmit={this.props.handleSubmit}>
            <Grid columns="equal">
              <Grid.Column computer="8" tablet="16" mobile="16">
                <Field name="assistant" component={FormDropdownField} label="Assistant" options={this.state.assistantArray}/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="16" mobile="16">
                <Field name="startDate" component={FormDateFieldWithErrorLabel} type="text" label="Start date"
                       isValidDate={(date) => {
                         return date.isBetween(moment('2017-01-01'), moment().add(1, 'years'));}
                       }
                       validate={[required, dateBetween('D.M.YYYY',moment('2017-01-01'), moment().add(1, 'years'))]}
                />
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <FormTimeGroupWithErrorLabel name="startTime" label="Start time"/>
              </Grid.Column>
              <Grid.Column computer="8" tablet="8" mobile="16">
                <FormTimeGroupWithErrorLabel name="endTime" label="End time"/>
              </Grid.Column>
              <Grid.Column computer="16" tablet="16" mobile="16" verticalAlign="bottom">
                <Field name="sick" component={FormToggle} label="Was sick?" icon={<Icon name="plus" circular size="small" className="icon-sick"/>} />
              </Grid.Column>
            </Grid>
            <Field component="input" type="hidden" name="target"/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {this.props.target && <Button negative floated="left" onClick={() => this.props.onDelete(this.props.target)} loading={this.props.submitting} disabled={this.props.submitting}>Delete</Button>}
          <Button secondary onClick={() => (this.props.reset() & this.props.onClose())} loading={this.props.submitting} disabled={this.props.submitting}>Cancel</Button>
          <Button form="WorkShiftForm" type="submit" loading={this.props.submitting} disabled={this.props.submitting} positive>Save</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ScheduleModalForm.propTypes = {
  assistants: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  target: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'WorkShiftForm'
})(ScheduleModalForm);
