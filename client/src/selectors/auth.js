import { createSelector } from 'reselect'
import { selEmployer } from "./entities/employer"

const selAuth = state => state.auth
const selToken = createSelector(selAuth, auth => auth.token)
const selIsAuthenticating = createSelector(selToken, token => !!token)
const selIsAuthenticated = createSelector(
  selToken,
  selEmployer,
  (token, employer) => !!(token && employer)
)

export {
  selToken,
  selIsAuthenticated,
  selIsAuthenticating
}
