'use strict';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
//import store from './store';
import App from './components/App';

import { initializeSocket } from './socket';
initializeSocket();

// require('./stylesheets/style.scss');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
