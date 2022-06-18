import React from 'react';
import ReactDOM from 'react-dom/client';
import RootCmp from './root-cmp';
import { store } from './store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/scss/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  // </React.StrictMode>
);


