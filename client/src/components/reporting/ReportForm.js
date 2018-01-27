import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid} from "semantic-ui-react";
import {reduxForm, Field} from 'redux-form';
import FormDateFieldWithErrorLabel from "../common/FormDateFieldWithErrorLabel";
import FormDropdownField from "../common/FormDropdownField";
import moment from "moment";
import {dateBetween, required} from "../../utils/validationConstraints";

class ReportForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      assistantArray: ReportForm.getAssistantOptions(props.assistants),
      yearsArray: ReportForm.getYearOptions(),
      monthsArray: ReportForm.getMonthOptions(),
      rangesArray: this.getRangeOptions(),
      rangeStyle: props.city === "Espoo" ? 2 : 1
    };
  }

  componentWillReceiveProps(nextProps) {
    let nextState = Object.assign({}, this.state, {assistantArray: ReportForm.getAssistantOptions(nextProps.assistants)});
    this.setState(nextState);
  }

  static getAssistantOptions(assistants) {
    if(!assistants)
      return [];

    return assistants
        .filter(a => a.active)
        .map(a => {
          return {key: a.id, text: a.firstName + " " + a.lastName, value: a.id};
        });
  }

  static getYearOptions() {
    let years = [];
    for (let y = moment().year()+1; y > 2010; y--) {
      years.push(""+y);
    }

    return years.map(y => {return {key:y, text:y, value:y}});
  }

  static getMonthOptions() {
    let months = [];
    for(let i=1; i<=12; i++)
      months.push(i);
    return months.map(m => {return {key: m+"", text: m+"", value: (m-1)+""}});
  }

  getRangeOptions() {
    return ["0","1","2"].map(r => {return {key: r, text: this.props.msg ['reporting.range'+r], value: r}});
  }

  render() {
    return (
      <Form id="WorkShiftForm" onSubmit={this.props.handleSubmit}>
        <Grid columns="equal">
          <Grid.Column computer="4" tablet="16" mobile="16">
            <Field name="assistant" component={FormDropdownField}
                   label={this.props.msg['reporting.assistant']}
                   options={this.state.assistantArray}
                   onChangeExtra={(value) => {
                     let assistantById = this.props.assistants.filter(a => a.id === value);
                     if(assistantById.length === 1)
                       this.props.onAssistantChange(assistantById[0]);
                   }}
                   validate={[required]}/>
          </Grid.Column>
          {this.state.rangeStyle === 1 && (
            <Grid.Column computer="3" tablet="16" mobile="16">
              <Field name="startDate" component={FormDateFieldWithErrorLabel} type="text"
                     label={this.props.msg['reporting.startDate']}
                     isValidDate={(date) => {
                       return date.isBetween(moment('2017-01-01'), moment());}
                     }
                     validate={[required, dateBetween('D.M.YYYY',moment('2017-01-01'), moment())]}
              />
            </Grid.Column>
          )}
          {this.state.rangeStyle === 1 && (
            <Grid.Column computer="3" tablet="16" mobile="16">
              <Field name="endDate" component={FormDateFieldWithErrorLabel} type="text"
                     label={this.props.msg['reporting.endDate']}
                     isValidDate={(date) => {
                       return date.isBetween(moment('2017-01-01'), moment().add(1, 'days'));}
                     }
                     validate={[required, dateBetween('D.M.YYYY',moment('2017-01-01'), moment().add(1, "days"))]}
              />
            </Grid.Column>
          )}
          {this.state.rangeStyle === 2 && (
            <Grid.Column computer="2" tablet="16" mobile="16">
              <Field name="year" component={FormDropdownField}
                     label={this.props.msg['reporting.year']}
                     options={this.state.yearsArray}
                     validate={[required]}
              />
            </Grid.Column>
          )}
          {this.state.rangeStyle === 2 && (
            <Grid.Column computer="2" tablet="16" mobile="16">
              <Field name="month" component={FormDropdownField}
                     label={this.props.msg['reporting.month']}
                     options={this.state.monthsArray}
                     validate={[required]}
              />
            </Grid.Column>
          )}
          {this.state.rangeStyle === 2 && (
            <Grid.Column computer="3" tablet="16" mobile="16">
              <Field name="range" component={FormDropdownField}
                     label={this.props.msg['reporting.range']}
                     options={this.state.rangesArray}
                     validate={[required]}
              />
            </Grid.Column>
          )}


          <Grid.Column computer="5" tablet="16" mobile="16" verticalAlign="bottom">
            {this.props.downloadable ? (
              <div
                onClick={() => {
                console.log("reset");
                this.props.onStartDownload();
              }}>
                <Button
                  as="a" href={this.props.downloadLink}
                  floated="right" primary size="large" style={{width: "250px"}}
                  >
                  {this.props.msg['reporting.downloadBtn']}
                </Button>
              </div>
            ) : (
              <Button type="submit" floated="right" primary size="large"
                      disabled={this.props.submitting || this.props.polling}
                      loading={this.props.submitting || this.props.polling}
                      style={{width: "250px"}}>
                {this.props.msg['reporting.startBtn']}
              </Button>
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
  msg: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'ReportForm'
})(ReportForm);
