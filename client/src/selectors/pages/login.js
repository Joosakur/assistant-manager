import {createSelector} from 'reselect'

import {selPages} from '../pages'

const selLoginPage = createSelector(selPages, pages => pages.login)



export {
  selLoginPage
}
