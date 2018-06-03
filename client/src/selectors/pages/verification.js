import {createSelector} from 'reselect'

import {selPages} from '../pages'

const selVerificationPage = createSelector(selPages, pages => pages.verification)
const selIsLoading = createSelector(selVerificationPage, page => page.loading)
const selError = createSelector(selVerificationPage, page => page.error)

export {
  selIsLoading,
  selError
}
