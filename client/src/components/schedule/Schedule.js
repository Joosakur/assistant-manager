import React from 'react'
import PropTypes from 'prop-types'
import {Button, Container, Divider, Header, Sidebar, Icon, Segment} from 'semantic-ui-react'

import ScheduleEditorContainer from './edit/ScheduleEditorContainer'
import CalendarContainer from './calendar/CalendarContainer'
import s from '../../localization'

const Schedule = ({onCreateNew, loading}) => {
  return (
    <Sidebar.Pushable>
      <ScheduleEditorContainer  />
      <Container className='page-container'>
        <Header floated='left' as='h1'><Icon name='calendar'/> {s.schedule.title}</Header>
        <Button primary size='big' floated='right' icon='add' content={s.schedule.addBtn} onClick={onCreateNew}/>
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
  loading: PropTypes.bool
}

export default Schedule
