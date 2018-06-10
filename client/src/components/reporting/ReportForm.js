import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Grid, Icon} from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'
import moment from 'moment'

import FormDateFieldWithErrorLabel from '../common/FormDateFieldWithErrorLabel'
import FormDropdownField from '../common/FormDropdownField'
import {dateBetween, required} from '../../utils/validationConstraints'
import RangeTypes from '../../constants/reportRangeTypes'
import Ranges from '../../constants/reportRanges'
import cities from '../../constants/cities'
import s from "../../localization"

export const reduxFormName = 'ReportForm'

class ReportForm extends React.Component {

  static getAssistantOptions(assistants) {
    if(!assistants)
      return []

    return assistants
      .filter(a => a.active)
      .map(a => {
        return {key: a.id, text: a.firstName + ' ' + a.lastName, value: a.id}
      })
  }

  static getYearOptions() {
    let years = []
    for (let y = moment().year()+1; y > 2010; y--) {
      years.push(''+y)
    }

    return years.map(y => {return {key:y, text:y, value:y}})
  }

  static getMonthOptions() {
    let months = []
    for(let i=1; i<=12; i++)
      months.push(i)
    return months.map(m => {return {key: m+'', text: m+'', value: (m-1)+''}})
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      assistantArray: ReportForm.getAssistantOptions(props.assistants),
      yearsArray: ReportForm.getYearOptions(),
      monthsArray: ReportForm.getMonthOptions(),
      rangesArray: this.getRangeOptions(),
      rangeStyle: props.city === cities.ESPOO ? RangeTypes.RANGE : RangeTypes.DATES
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      assistantArray: ReportForm.getAssistantOptions(nextProps.assistants)
    })
  }

  getRangeOptions() {
    return Object.values(Ranges).map(r => {return {key: r, text: s.reporting[`range${r}`]}})
  }

  render() {
    const { handleSubmit, assistants, downloadLink, downloadable,
      onAssistantChange, polling, onStartDownload, submitting} = this.props
    const rs = s.reporting
    const { assistantArray, yearsArray, monthsArray, rangesArray, rangeStyle} = this.state
    return (
      <Form id='WorkShiftForm' onSubmit={handleSubmit}>
        <Grid columns='equal'>
          <Grid.Column computer='4' tablet='16' mobile='16'>
            <Field name='assistant' component={FormDropdownField}
                   label={rs.assistant}
                   options={assistantArray}
                   onChangeExtra={value => {
                     const assistantById = assistants.filter(a => a.id === value)
                     if(assistantById.length === 1)
                       onAssistantChange(assistantById[0])
                   }}
                   validate={[required]}/>
          </Grid.Column>
          {rangeStyle === RangeTypes.DATES && (
            <Fragment>
              <Grid.Column computer='3' tablet='16' mobile='16'>
                <Field name='startDate' component={FormDateFieldWithErrorLabel} type='text'
                       label={rs.startDate}
                       isValidDate={(date) => {
                         return date.isBetween(moment('2017-01-01'), moment())}
                       }
                       validate={[required, dateBetween('D.M.YYYY',moment('2017-01-01'), moment())]}
                />
              </Grid.Column>
              <Grid.Column computer='3' tablet='16' mobile='16'>
                <Field name='endDate' component={FormDateFieldWithErrorLabel} type='text'
                       label={rs.endDate}
                       isValidDate={(date) => {
                         return date.isBetween(moment('2017-01-01'), moment().add(1, 'days'))}
                       }
                       validate={[required, dateBetween('D.M.YYYY',moment('2017-01-01'), moment().add(1, 'days'))]}
                />
              </Grid.Column>
            </Fragment>
          )}
          {rangeStyle === RangeTypes.RANGE && (
            <Fragment>
              <Grid.Column computer='2' tablet='16' mobile='16'>
                <Field name='year' component={FormDropdownField}
                       label={rs.year}
                       options={yearsArray}
                       validate={[required]}
                />
              </Grid.Column>
              <Grid.Column computer='2' tablet='16' mobile='16'>
                <Field name='month' component={FormDropdownField}
                       label={rs.month}
                       options={monthsArray}
                       validate={[required]}
                />
              </Grid.Column>
              <Grid.Column computer='3' tablet='16' mobile='16'>
                <Field name='range' component={FormDropdownField}
                       label={rs.range}
                       options={rangesArray}
                       validate={[required]}
                />
              </Grid.Column>
            </Fragment>
          )}

          <Grid.Column computer='5' tablet='16' mobile='16' verticalAlign='bottom'>
            {downloadable ? (
              <div
                onClick={() => {
                onStartDownload()
              }}>
                <Button
                  as='a' href={downloadLink}
                  floated='right' primary size='large' style={{width: '250px'}} positive>
                  <Icon name='download'/>{rs.downloadBtn}
                </Button>
              </div>
            ) : (
              <Button type='submit' floated='right' primary size='large'
                      disabled={submitting || polling}
                      loading={submitting || polling}
                      style={{width: '250px'}}>
                <Icon name='magic'/>{rs.startBtn}
              </Button>
            )}
          </Grid.Column>
        </Grid>
        <Field component='input' type='hidden' name='target'/>
      </Form>
    )
  }
}

ReportForm.propTypes = {
  assistants: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  polling: PropTypes.bool,
  downloadable: PropTypes.bool.isRequired,
  downloadLink: PropTypes.string,
  onAssistantChange: PropTypes.func.isRequired,
  onStartDownload: PropTypes.func.isRequired
}

export default reduxForm({
  form: reduxFormName
})(ReportForm)
