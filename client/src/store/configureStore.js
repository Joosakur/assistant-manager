import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

function configureStoreProd(history) {
  const middlewares = [
    routerMiddleware(history),
    sagaMiddleware
  ]

  const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)))
  sagaMiddleware.run(rootSaga)
  return store
}

function configureStoreDev(history) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    routerMiddleware(history),
    sagaMiddleware
  ]

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
  const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  )
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
