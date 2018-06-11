import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer as HotLoader } from 'react-hot-loader'

import localization from './localization'
import Root from './components/Root'
import configureStore from './store/configureStore'
import './styles/styles.scss'
require('./favicon.ico')

const history = createHistory()
const store = configureStore(history)

localization.setLanguage('fi')

render(
  <HotLoader>
    <Root store={store} history={history} />
  </HotLoader>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default
    render(
      <HotLoader>
        <NewRoot store={store} history={history} />
      </HotLoader>,
      document.getElementById('app')
    )
  })
}
