import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'

import {store} from "./reducers";
import {BrowserRouter} from "react-router-dom";

import Amplify, {Auth} from "aws-amplify";
import config from './aws-exports'

Amplify.configure(config)



ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

