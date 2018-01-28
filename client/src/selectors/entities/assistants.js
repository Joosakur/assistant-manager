import { createSelector } from 'reselect'

import { selEntities } from "../entities"

const selAssistants = createSelector(selEntities, entities => entities.assistants)
const selAssistantsArray = createSelector(selAssistants, assistants => Object.values(assistants))
const selAssistantById = assistantId => createSelector(selAssistants, assistants => assistants[assistantId])

export {
  selAssistants,
  selAssistantsArray,
  selAssistantById
}
