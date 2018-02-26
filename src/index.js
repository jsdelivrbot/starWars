import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './containers/appContainer';
import reducers from './reducers';

export const store = createStore(reducers, composeWithDevTools(
    applyMiddleware()
    // other store enhancers if any
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container')
);
