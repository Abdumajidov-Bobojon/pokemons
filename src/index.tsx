import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import Theme from './theme';
import "./index.css"
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Theme>
        <Provider store={store}>
          <App />
        </Provider>
      </Theme>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);