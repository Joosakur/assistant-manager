import * as R from 'ramda'
import { createSelector } from 'reselect'

import { selEntities } from "../entities"

const sortByCaseInsensitive = prop => R.sortBy(R.compose(R.toLower, R.prop(prop)))
const sortByName = R.sortWith([
  sortByCaseInsensitive('firstName'),
  sortByCaseInsensitive('lastName')
])

const selAssistants = createSelector(selEntities, entities => entities.assistants)
const selAssistantsArray = createSelector(selAssistants, assistants => Object.values(assistants))
const selAssistantsArrayOrderedByName = createSelector(selAssistantsArray, assistants => sortByName(assistants))
const selAssistantById = assistantId => createSelector(selAssistants, assistants => assistants[assistantId])

export {
  selAssistants,
  selAssistantsArray,
  selAssistantsArrayOrderedByName,
  selAssistantById
}
