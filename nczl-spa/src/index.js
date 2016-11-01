//兼容IE8 add es5-polyfill  size:33K
/*import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';*/
import 'core-js/fn/object/assign';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import {checkLoginReq} from './actions'
import configureStore from './stores';
import routes from './routes';

const store = configureStore(hashHistory);
console.log("initial state:",store.getState());
const history = syncHistoryWithStore(hashHistory, store);
store.dispatch(checkLoginReq());



ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
