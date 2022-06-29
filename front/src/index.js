import React from 'react';
// import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import RootCmp from './root-cmp';
import { store } from './store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'react-calendar/dist/Calendar.css';

import './assets/scss/main.scss';
import './services/i18n'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  
    <Provider store={store}>
       {/* document.body.dir = i18n.dir(); */}
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  
  // </React.StrictMode>
);


