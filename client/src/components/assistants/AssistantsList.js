import React from 'react'
import PropTypes from 'prop-types'
import {Card} from "semantic-ui-react"
import AssistantCard from "./AssistantCard"

const AssistantsList = ({assistants, openEditAssistantDialog, translate}) => {
  return (
    <Card.Group>
      {
        assistants.map(assistant => (
          <AssistantCard
            key={assistant.id}
            assistant={assistant}
            onEdit={() => openEditAssistantDialog(assistant.id)}
            translate={translate}
        />
        ))
      }
    </Card.Group>
  )
}

AssistantsList.propTypes = {
  assistants: PropTypes.array.isRequired,
  openEditAssistantDialog: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}

export default AssistantsList
