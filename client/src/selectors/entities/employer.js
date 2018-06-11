import { createSelector } from 'reselect'

import { selEntities } from '../entities'

const selEmployer = createSelector(selEntities, entities => entities.employer)

export {
  selEmployer
}
