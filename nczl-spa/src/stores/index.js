/**
 * Created by admin on 2016/10/18.
 */
//import redux ,{createStore} from 'redux'
import reducers from '../reducers'


import { compose ,createStore } from 'redux'

export default function(initialState){
  const store =createStore(reducers, initialState, compose(
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

