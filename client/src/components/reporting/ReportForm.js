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

class ReportForm extends React.Component {

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
    return assistantArray;
  }

  render() {
    return (
      <Form id="WorkShiftForm" onSubmit={this.props.handleSubmit}>
        <Grid columns="equal">
          <Grid.Column computer="5" tablet="16" mobile="16">
            <Field name="assistant" component={FormDropdownField} label="Assistant" options={this.state.assistantArray}
                   onChangeExtra={(value) => {
                     let assistantById = this.props.assistants.filter(a => a.id === value);
                     if(assistantById.length === 1)
                       this.props.onAssistantChange(assistantById[0])
                   }}
                   validate={[required]}/>
          </Grid.Column>
          <Grid.Column computer="3" tablet="16" mobile="16">
            <Field name="startDate" component={FormDateFieldWithErrorLabel} type="text" label="Start date"
                   isValidDate={(date) => {
                     return date.isBetween(moment('2017-01-01'), moment());}
                   }
                   validate={[required, dateBetween('D.M.YYYY',moment('2017-01-01'), moment())]}
            />
          </Grid.Column>
          <Grid.Column computer="3" tablet="16" mobile="16">
            <Field name="endDate" component={FormDateFieldWithErrorLabel} type="text" label="End date"
                   isValidDate={(date) => {
                     return date.isBetween(moment('2017-01-01'), moment().add(1, 'years'));}
                   }
                   validate={[required, dateBetween('D.M.YYYY',moment('2017-01-01'), moment())]}
            />
          </Grid.Column>
          <Grid.Column computer="5" tablet="16" mobile="16" verticalAlign="bottom">
            {this.props.downloadable ? (
              <div
                onClick={() => {
                this.props.resetForm();
                this.props.onStartDownload();
              }}>
                <Button
                  as="a" href={this.props.downloadLink}
                  floated="right" primary size="large" style={{width: "250px"}}
                  >
                  Download Spreadsheet
                </Button>
              </div>
            ) : (
              <Button type="submit" floated="right" primary size="large"
                      disabled={this.props.submitting || this.props.polling}
                      loading={this.props.submitting || this.props.polling}
                      style={{width: "250px"}}>Start Export</Button>
            )}
          </Grid.Column>
        </Grid>
        <Field component="input" type="hidden" name="target"/>
      </Form>
    );
  }
}

ReportForm.propTypes = {
  assistants: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  polling: PropTypes.bool.isRequired,
  downloadable: PropTypes.bool.isRequired,
  downloadLink: PropTypes.string,
  onAssistantChange: PropTypes.func.isRequired,
  onStartDownload: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'ReportForm'
})(ReportForm);
