import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {
  fetchAllFilms,
  checkAuthAction,
  fetchPromo,
} from './store/async-action';

store.dispatch(fetchAllFilms());
store.dispatch(checkAuthAction());
store.dispatch(fetchPromo());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
