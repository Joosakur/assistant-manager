import { createSelector } from 'reselect'
import {selEntities} from '../entities'

const selWorkShiftsByAssistantIndex = createSelector(selEntities, entities => entities.workShiftsByAssistant)
const selWorkShiftIdsByAssistant = assistantId => createSelector(selWorkShiftsByAssistantIndex, ind => ind[assistantId])
//const selWorkShiftsByAssistant

export {
  selWorkShiftsByAssistantIndex,
  selWorkShiftIdsByAssistant
}
