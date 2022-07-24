import React from 'react';
import { FILMS } from './mocks/films';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={FILMS} />
  </React.StrictMode>
);
