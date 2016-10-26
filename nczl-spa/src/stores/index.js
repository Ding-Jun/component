/**
 * Created by admin on 2016/10/18.
 */
//import redux ,{createStore} from 'redux'
import { compose ,createStore ,applyMiddleware} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

export default function(history,initialState){
  const middleware = [ thunk ]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }
  const store =createStore(reducers, initialState, compose(
    applyMiddleware(
      routerMiddleware(history),
      ...middleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

