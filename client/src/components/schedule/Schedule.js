import React from 'react';
import PropTypes from 'prop-types';
import ScheduleEditorContainer from "../../containers/ScheduleEditorContainer";
import {Button, Container, Divider, Header, Sidebar, Icon, Segment} from "semantic-ui-react";
import CalendarContainer from "../../containers/CalendarContainer";

const Schedule = ({onCreateNew, loading}) => {
  return (
    <Sidebar.Pushable>
      <ScheduleEditorContainer/>
      <Container className="page-container">
        <Header floated="left" as="h1"><Icon name="calendar"/> Work Schedule</Header>
        <Button primary size="big" floated="right" icon="add" content="Create new" onClick={onCreateNew}/>
        <Divider hidden section clearing/>
        <Segment basic loading={loading}>
          <CalendarContainer/>
        </Segment>
      </Container>
    </Sidebar.Pushable>
  );
};

Schedule.propTypes = {
  onCreateNew: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default Schedule;

