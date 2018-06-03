import {createSelector} from 'reselect'

import {selPages} from '../pages'

const selReportingPage = createSelector(selPages, pages => pages.reporting)
const selIsPolling = createSelector(selReportingPage, page => page.polling)
const selDownloadLink = createSelector(selReportingPage, page => page.downloadLink)
const selIsDownloadable = createSelector(selDownloadLink, link => !!link)

export {
  selIsPolling,
  selDownloadLink,
  selIsDownloadable
}
