import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'

import App from './components/App'
import HomePage from '../src/pages/HomePage'
import AssistantsPage from '../src/pages/AssistantsPage'
import RegistrationPage from '../src/pages/RegistrationPage'
import {SELF} from '../src/constants/urls'
import LoginPage from "../src/pages/LoginPage"
import {connectedRouterRedirect} from "redux-auth-wrapper/history3/redirect"
import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import SchedulePage from "../src/pages/SchedulePage"
import AuthLoader from "../src/components/login/AuthLoader"
import SharedSchedulePage from "../src/pages/SharedSchedulePage"
import RegisteredPage from "../src/pages/RegisteredPage"
import VerificationPage from "../src/pages/VerificationPage"
import ReportingPage from "../src/pages/ReportingPage"

const locationHelper = locationHelperBuilder({})

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: SELF.login,
  // Determine if the user is authenticated or not
  authenticatedSelector: state => state.login.authenticated === true,
  //authentication is on going
  authenticatingSelector: state => state.login.authenticating === true,
  AuthenticatingComponent: AuthLoader,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',
  //redirect via redux-router
  redirectAction: routerActions.replace,
})

const userIsNotAuthenticated = connectedRouterRedirect({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || SELF.home,
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // Determine if the user is authenticated or not
  authenticatedSelector: state => state.login.authenticated === false,
  //authentication is on going
  authenticatingSelector: state => state.login.authenticating === true,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated',
  //redirect via redux-router
  redirectAction: routerActions.replace,
})

export default (
  <Route path={SELF.home} component={App}>
    <IndexRoute component={HomePage}/>
    <Route path={SELF.assistants} component={userIsAuthenticated(AssistantsPage)}/>
    <Route path={SELF.schedule} component={userIsAuthenticated(SchedulePage)}/>
    <Route path={SELF.register} component={userIsNotAuthenticated(RegistrationPage)}/>
    <Route path={SELF.registered} component={RegisteredPage}/>
    <Route path={SELF.verifyAccount} component={VerificationPage}/>
    <Route path={SELF.login} component={userIsNotAuthenticated(LoginPage)}/>
    <Route path={SELF.scheduleShare+"/:shareId"} component={SharedSchedulePage}/>
    <Route path={SELF.reporting} component={userIsAuthenticated(ReportingPage)}/>
  </Route>
)
