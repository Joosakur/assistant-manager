import { createSelector } from 'reselect'

import { selEntities } from "../entities"

const selWorkShifts = createSelector(selEntities, entities => entities.workShifts)
const selWorkShiftsArray = createSelector(selWorkShifts, workShifts => Object.values(workShifts))
const selWorkShiftById = workShiftId => createSelector(selWorkShifts, workShifts => workShifts[workShiftId])

export {
  selWorkShifts,
  selWorkShiftsArray,
  selWorkShiftById
}
