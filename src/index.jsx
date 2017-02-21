import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Store from './app/store';
import App from './app/app';

const store = new Store();

const el = document.createElement('div');
document.body.appendChild(el);

render(
  <App store={store} />,
  el,
);
