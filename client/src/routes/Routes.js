import React from 'react'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import {ConnectedRouter, routerActions} from 'react-router-redux'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import { SELF } from '../constants/urls'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import AssistantsPage from '../pages/AssistantsPage'
import ProfilePage from '../pages/ProfilePage'
import SchedulePage from '../pages/SchedulePage'
import SharedSchedulePage from '../pages/SharedSchedulePage'
import RegisteredPage from '../pages/RegisteredPage'
import RegistrationPage from '../pages/RegistrationPage'
import VerificationPage from '../pages/VerificationPage'
import ReportingPage from '../pages/ReportingPage'
import AuthLoader from '../components/login/AuthLoader'
import {selIsAuthenticated, selIsAuthenticating} from '../selectors/auth'

const locationHelper = locationHelperBuilder({})

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: SELF.login,
  authenticatedSelector: selIsAuthenticated,
  authenticatingSelector: selIsAuthenticating,
  AuthenticatingComponent: AuthLoader,
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: routerActions.replace
})

const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || SELF.home,
  allowRedirectBack: false,
  authenticatedSelector: state => {
    return !selIsAuthenticated(state) && !selIsAuthenticating(state)
  },
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectAction: routerActions.replace
})

class Routes extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path={SELF.register} component={userIsNotAuthenticated(RegistrationPage)}/>
          <Route exact path={SELF.registered} component={RegisteredPage}/>
          <Route exact path={SELF.verifyAccount} component={VerificationPage}/>
          <Route exact path={SELF.login} component={userIsNotAuthenticated(LoginPage)}/>
          <Route exact path={SELF.profile} component={userIsAuthenticated(ProfilePage)}/>
          <Route exact path={SELF.assistants} component={userIsAuthenticated(AssistantsPage)}/>
          <Route exact path={SELF.schedule} component={userIsAuthenticated(SchedulePage)}/>
          <Route path={`${SELF.scheduleShare}/:shareId`} component={SharedSchedulePage}/>
          <Route path={SELF.reporting} component={userIsAuthenticated(ReportingPage)}/>
        </Switch>
      </ConnectedRouter>
    )
  }
}

export default Routes
