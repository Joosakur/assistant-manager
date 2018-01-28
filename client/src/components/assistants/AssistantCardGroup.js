import React from 'react'
import PropTypes from 'prop-types'
import {Card} from "semantic-ui-react"
import AssistantFluidCard from "./AssistantFluidCard"

const AssistantCardGroup = ({assistants, openEditor, translate}) => {
  return (
    <Card.Group>
      {assistants.map((assistant) => (<AssistantFluidCard key={assistant.id} assistant={assistant}
                                                         onEdit={() => openEditor(assistant.id)}
                                                         translate={translate}
      />))}
    </Card.Group>
  )
}

AssistantCardGroup.propTypes = {
  assistants: PropTypes.array.isRequired,
  openEditor: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}

export default AssistantCardGroup
