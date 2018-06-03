import {createSelector} from 'reselect'

import {selPages} from '../pages'

const selWorkShiftsPage = createSelector(selPages, pages => pages.schedule)
const selIsLoading = createSelector(selWorkShiftsPage, page => page.loading)
const selCopiedDay = createSelector(selWorkShiftsPage, page => page.copiedDay)

const selWorkShiftDialog = createSelector(selWorkShiftsPage, page => page.workShiftDialog)
const selIsWorkShiftDialogOpen = createSelector(selWorkShiftDialog, dialog => dialog.open)
const selEditedWorkShiftId = createSelector(selWorkShiftDialog, dialog => dialog.workShiftId)
const selIsCreatingNewWorkShift = createSelector(selEditedWorkShiftId, workShiftId => !workShiftId)

export {
  selIsLoading,
  selCopiedDay,
  selIsWorkShiftDialogOpen,
  selEditedWorkShiftId,
  selIsCreatingNewWorkShift
}
