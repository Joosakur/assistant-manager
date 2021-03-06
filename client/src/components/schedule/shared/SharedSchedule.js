import React from 'react'
import PropTypes from 'prop-types'
import {Container, Divider, Header, Icon, Segment} from 'semantic-ui-react'

import CalendarContainer from '../calendar/CalendarContainer'

const SharedSchedule = ({loading, assistantId}) => {
  return (
      <Container>
        <Header floated='left' as='h1'><Icon name='calendar'/> Työvuorot / Work schedule</Header>
        <Divider hidden section clearing/>
        <Segment basic loading={loading}>
          <CalendarContainer assistantId={assistantId}/>
        </Segment>
      </Container>
  )
}

SharedSchedule.propTypes = {
  loading: PropTypes.bool,
  assistantId: PropTypes.string.isRequired
}

export default SharedSchedule
