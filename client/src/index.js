import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer as HotLoader } from 'react-hot-loader'
import Root from './components/Root'
import { initialize, addTranslation } from 'react-localize-redux'
import configureStore from './store/configureStore'
import './styles/styles.scss'
require('./favicon.ico')

const history = createHistory()
const store = configureStore(history)

const languages = ['fi', 'en']
store.dispatch(initialize(languages))
const translations = require('./global.locale.json')
store.dispatch(addTranslation(translations))

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
