import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

import AppContainer from './AppContainer'
import Routes from '../routes/Routes'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Fragment>
          <AppContainer>
            <Routes history={history} />
          </AppContainer>
          <ReduxToastr/>
        </Fragment>
      </Provider>
    )
  }
}
