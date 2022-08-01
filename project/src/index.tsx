import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { FILMS } from './mocks/films';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App films={FILMS} />
    </Provider>
  </React.StrictMode>
);
