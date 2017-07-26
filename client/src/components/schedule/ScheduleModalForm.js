import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Header, Image, Modal} from "semantic-ui-react";

const ScheduleModalForm = ({open, target, onClose}) => {
  return (
    <Modal dimmer="inverted" open={open} onClose={onClose}>
      <Modal.Header>{target ? <span>Edit</span> : <span>Create new</span>}</Modal.Header>
      <Form>
        <Modal.Content image>
          <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading} positive>Save</Button>
        </Modal.Actions>
      </Form>
    </Modal>
  );
};

ScheduleModalForm.propTypes = {
  open: PropTypes.bool.isRequired,
  target: PropTypes.string,
  onClose: PropTypes.func.isRequired,

};

export default ScheduleModalForm;
