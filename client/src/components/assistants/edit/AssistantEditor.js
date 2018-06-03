import React from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Grid, Icon, Label, Modal} from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'
import moment from 'moment'

import FormToggle from '../../common/FormToggle'
import FormFieldWithErrorLabel from '../../common/FormFieldWithErrorLabel'
import FormColorPickerWithLabel from '../../common/FormColorPickerWithLabel'
import {dateBefore, maxLength, required} from '../../../utils/validationConstraints'

export const reduxFormName = 'AssistantForm'

class AssistantEditor extends React.Component {
  render() {
    return (
      <Modal dimmer='inverted' size='small' open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header style={{height: '70px'}}>
          {this.props.assistantId ? <span>{this.props.msg['assistants.edit.titleEdit']}</span> : <span>{this.props.msg['assistants.edit.titleNew']}</span>}
          <Label style={{float: 'right', width: '150px', overflow: 'hidden', whiteSpace: 'no-wrap',
            backgroundColor: this.props.backgroundColor, color: this.props.whiteText ? '#ffffff' : '#000000'}} size='large'>
            <Icon name='user' size='large'/> {this.props.shortName}
          </Label>
        </Modal.Header>
        <Modal.Content>
          <Form id='AssistantForm' onSubmit={this.props.handleSubmit}>
            <Grid columns='equal'>
              <Grid.Column computer='8' tablet='8' mobile='16'>
                <Field name='firstName' component={FormFieldWithErrorLabel} type='text'
                       label={this.props.msg['assistants.edit.firstName']}
                       placeholder={this.props.msg['assistants.edit.firstName']}
                       isRequired
                       validate={[required, maxLength(20)]}/>
              </Grid.Column>
              <Grid.Column computer='8' tablet='8' mobile='16'>
                <Field name='lastName' component={FormFieldWithErrorLabel} type='text'
                       label={this.props.msg['assistants.edit.lastName']}
                       placeholder={this.props.msg['assistants.edit.lastName']}
                       isRequired
                       validate={[required, maxLength(30)]}/>
              </Grid.Column>
              <Grid.Column computer='8' tablet='8' mobile='16'>
                <Field name='nickName' component={FormFieldWithErrorLabel} type='text'
                       label={this.props.msg['assistants.edit.nickName']}
                       placeholder={this.props.msg['assistants.edit.nickName']}
                       validate={[maxLength(12)]}/>
              </Grid.Column>
              <Grid.Column computer='8' tablet='8' mobile='16'>
                <Field name='birthday' component={FormFieldWithErrorLabel} type='text'
                       label={this.props.msg['assistants.edit.birthday']}
                       placeholder='31.12.1980'
                       isRequired
                       validate={[required, dateBefore('D.M.YYYY', moment().add(-16, 'years'))]}/>
              </Grid.Column>
              <Grid.Column computer='8' tablet='8' mobile='16'>
                <Field name='backgroundColor' component={FormColorPickerWithLabel}
                       label={this.props.msg['assistants.edit.backgroundColor']}/>
              </Grid.Column>
              <Grid.Column computer='8' tablet='8' mobile='16' verticalAlign='top'>
                <Field name='whiteText' component={FormToggle}
                       label={this.props.msg['assistants.edit.textInvert']}
                       icon='font'/>
              </Grid.Column>
            </Grid>
            <Field component='input' type='hidden' name='assistantId'/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.props.onClose} loading={this.props.submitting}
                  disabled={this.props.submitting}>
            {this.props.msg['assistants.edit.cancel']}
          </Button>
          <Button form='AssistantForm' type='submit' loading={this.props.submitting}
                  disabled={this.props.pristine || this.props.submitting} positive>
            {this.props.msg['assistants.edit.save']}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

AssistantEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  assistantId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  shortName: PropTypes.string,
  whiteText: PropTypes.bool,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  msg: PropTypes.object.isRequired
}

export default reduxForm({
  form: reduxFormName
})(AssistantEditor)
