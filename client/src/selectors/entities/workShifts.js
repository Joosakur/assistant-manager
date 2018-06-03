import { createSelector } from 'reselect'
import moment from 'moment'

import { selEntities } from '../entities'

const selWorkShifts = createSelector(selEntities, entities => entities.workShifts)
const selWorkShiftsArray = createSelector(selWorkShifts, workShifts => Object.values(workShifts))
const selWorkShiftById = workShiftId => createSelector(selWorkShifts, workShifts => workShifts[workShiftId])
const selWorkShiftsByStartDate = date => createSelector(selWorkShiftsArray, arr => arr.filter(ws => moment(ws.start).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')))

export {
  selWorkShifts,
  selWorkShiftsArray,
  selWorkShiftById,
  selWorkShiftsByStartDate
}
