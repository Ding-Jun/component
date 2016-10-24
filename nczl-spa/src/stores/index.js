/**
 * Created by admin on 2016/10/18.
 */
//import redux ,{createStore} from 'redux'
import { compose ,createStore ,applyMiddleware} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import reducers from '../reducers'
export default function(history,initialState){
  const store =createStore(reducers, initialState, compose(
    applyMiddleware(
      routerMiddleware(history)
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

