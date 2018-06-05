import { createSelector } from 'reselect'
import moment from 'moment'

import {selEntities} from '../entities'
import {selWorkShiftById} from '../entities/workShifts'

const selWorkShiftsByAssistantIndex = createSelector(selEntities, entities => entities.workShiftsByAssistant)
const selWorkShiftIdsByAssistant = assistantId => createSelector(selWorkShiftsByAssistantIndex, ind => ind[assistantId] || [])
const selWorkShiftsByAssistant = assistantId => state => selWorkShiftIdsByAssistant(assistantId)(state)
  .map(id => selWorkShiftById(id)(state))

const selWorkShiftsByStartDateIndex = createSelector(selEntities, entities => entities.workShiftsByStartDate)
const selWorkShiftIdsByStartDate = startDate => createSelector(
  selWorkShiftsByStartDateIndex,
  ind => ind[moment(startDate).format('YYYY-MM-DD')] || []
)
const selWorkShiftsByStartDate = startDate => state => selWorkShiftIdsByStartDate(startDate)(state)
  .map(id => selWorkShiftById(id)(state))

export {
  selWorkShiftsByAssistantIndex,
  selWorkShiftIdsByAssistant,
  selWorkShiftsByAssistant,
  selWorkShiftsByStartDateIndex,
  selWorkShiftIdsByStartDate,
  selWorkShiftsByStartDate
}
