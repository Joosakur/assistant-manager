import React from 'react'
import PropTypes from 'prop-types'
import {Button, Container, Divider, Header, Sidebar, Icon, Segment} from 'semantic-ui-react'

import ScheduleEditorContainer from './edit/ScheduleEditorContainer'
import CalendarContainer from './calendar/CalendarContainer'

const Schedule = ({onCreateNew, loading, translate}) => {
  return (
    <Sidebar.Pushable>
      <ScheduleEditorContainer
        msg={{...translate([
          'schedule.edit.titleNew','schedule.edit.titleEdit','schedule.edit.assistant','schedule.edit.startDate',
          'schedule.edit.startTime','schedule.edit.endTime','schedule.edit.sick',
          'schedule.edit.delete', 'schedule.edit.cancel', 'schedule.edit.save'
        ])}}
      />
      <Container className='page-container'>
        <Header floated='left' as='h1'><Icon name='calendar'/> {translate('schedule.title')}</Header>
        <Button primary size='big' floated='right' icon='add' content={translate('schedule.newBtn')} onClick={onCreateNew}/>
        <Divider hidden section clearing/>
        <Segment basic loading={loading}>
          <CalendarContainer/>
        </Segment>
      </Container>
    </Sidebar.Pushable>
  )
}

Schedule.propTypes = {
  onCreateNew: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  translate: PropTypes.func.isRequired
}

export default Schedule
