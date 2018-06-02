import React from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Grid, Icon, Modal} from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'
import moment from 'moment'

import FormDateFieldWithErrorLabel from '../common/FormDateFieldWithErrorLabel'
import FormDropdownField from '../common/FormDropdownField'
import FormTimeGroupWithErrorLabel from '../common/FormTimeGroupFieldWithErrorLabel'
import FormToggle from '../common/FormToggle'
import {dateBetween, required} from '../../utils/validationConstraints'

export const reduxFormName = 'WorkShiftForm'

class ScheduleModalForm extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      assistantArray: this.getAssistantOptions(props.assistants)
    }
  }

  componentWillReceiveProps(nextProps) {
    let nextState = Object.assign({}, this.state, {assistantArray: this.getAssistantOptions(nextProps.assistants)})
    this.setState(nextState)
  }

  getAssistantOptions(assistants) {
    let assistantArray = assistants ? assistants
      .filter(a => a.active)
      .map(a => {return {key: a.id, text: a.firstName + ' ' + a.lastName, value: a.id}})
      .sort((a1, a2) => {
        if(a1.text < a2.text)
          return -1
        return 1
      })
    : []
    assistantArray.unshift({key: 'Unassigned', value: 'Unassigned', text: 'Unassigned'})
    return assistantArray
  }

  render() {
    const { workShiftId, open, handleSubmit, onClose, onDelete, reset, submitting, msg } = this.props
    return (
      <Modal dimmer='inverted' size='small' open={open} onClose={onClose}>
        <Modal.Header>{workShiftId ?
          <span>{msg['schedule.edit.titleEdit']}</span> :
          <span>{msg['schedule.edit.titleNew']}</span>}
        </Modal.Header>
        <Modal.Content>
          <Form id='WorkShiftForm' onSubmit={handleSubmit}>
            <Grid columns='equal'>
              <Grid.Column computer='8' tablet='16' mobile='16'>
                <Field name='assistant' component={FormDropdownField}
                       label={msg['schedule.edit.assistant']}
                       options={this.state.assistantArray}/>
              </Grid.Column>
              <Grid.Column computer='8' tablet='16' mobile='16'>
                <Field name='startDate' component={FormDateFieldWithErrorLabel} type='text'
                       label={msg['schedule.edit.startDate']}
                       isValidDate={(date) => {
                         return date.isBetween(moment('2017-01-01'), moment().add(1, 'years'))}
                       }
                       validate={[required, dateBetween('D.M.YYYY',moment('2017-01-01'), moment().add(1, 'years'))]}
                />
              </Grid.Column>
              <Grid.Column computer='8' tablet='8' mobile='16'>
                <FormTimeGroupWithErrorLabel name='startTime' label={msg['schedule.edit.startTime']}/>
              </Grid.Column>
              <Grid.Column computer='8' tablet='8' mobile='16'>
                <FormTimeGroupWithErrorLabel name='endTime' label={msg['schedule.edit.endTime']}/>
              </Grid.Column>
              <Grid.Column computer='16' tablet='16' mobile='16' verticalAlign='bottom'>
                <Field name='sick' component={FormToggle} label={msg['schedule.edit.sick']}
                       icon={<Icon name='plus' circular size='small' className='icon-sick'/>} />
              </Grid.Column>
            </Grid>
            <Field component='input' type='hidden' name='target'/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {workShiftId && <Button negative floated='left'
                                        onClick={() => onDelete(workShiftId)}
                                        loading={submitting} disabled={submitting}>
            {msg['schedule.edit.delete']}
          </Button>}
          <Button secondary onClick={() => (reset() & onClose())}
                  loading={submitting} disabled={submitting}>
            {msg['schedule.edit.cancel']}
          </Button>
          <Button form='WorkShiftForm' type='submit'
                  loading={submitting} disabled={submitting} positive>
            {msg['schedule.edit.save']}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ScheduleModalForm.propTypes = {
  assistants: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  workShiftId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  msg: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: reduxFormName
})(ScheduleModalForm)
