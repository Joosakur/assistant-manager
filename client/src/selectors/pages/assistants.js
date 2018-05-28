import {createSelector} from "reselect"

import {selPages} from "../pages"

const selAssistantsPage = createSelector(selPages, pages => pages.assistants)
const selIsLoading = createSelector(selAssistantsPage, page => page.loading)

const selAssistantDialog = createSelector(selAssistantsPage, page => page.assistantDialog)
const selIsAssistantDialogOpen = createSelector(selAssistantDialog, dialog => dialog.open)
const selEditedAssistantId = createSelector(selAssistantDialog, dialog => dialog.assistantId)
const selIsCreatingNewAssistant = createSelector(selEditedAssistantId, assistantId => !assistantId)

export {
  selIsLoading,
  selIsAssistantDialogOpen,
  selEditedAssistantId,
  selIsCreatingNewAssistant
}
