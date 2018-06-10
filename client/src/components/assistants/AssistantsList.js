import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'semantic-ui-react'

import AssistantCard from './AssistantCard'

const AssistantsList = ({assistants, openEditAssistantDialog}) => {
  return (
    <Card.Group>
      {
        assistants.map(assistant => (
          <AssistantCard
            key={assistant.id}
            assistant={assistant}
            onEdit={() => openEditAssistantDialog(assistant.id)}
        />
        ))
      }
    </Card.Group>
  )
}

AssistantsList.propTypes = {
  assistants: PropTypes.array.isRequired,
  openEditAssistantDialog: PropTypes.func.isRequired
}

export default AssistantsList
