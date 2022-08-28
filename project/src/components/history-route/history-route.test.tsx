import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('HistoryRouter component tests', () => {
  it('should render component with path passed', async () => {
    const basename = '/';

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history} basename={basename}>
          <Routes>
            <Route path={'/test'} element={<div>Hello form test page</div>} />
            <Route path={'*'} element={<div>Some text</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    act(() => {
      history.push('/test');
    });
    await waitFor(() => {
      expect(screen.getByText('Hello form test page')).toBeInTheDocument();
    });
  });

  it('should render default with unknown path passed', async () => {
    const basename = '/';

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history} basename={basename}>
          <Routes>
            <Route path={'/test'} element={<div>Hello form test page</div>} />
            <Route path={'*'} element={<div>Some text</div>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    act(() => {
      history.push('/unknown');
    });
    await waitFor(() => {
      expect(screen.getByText('Some text')).toBeInTheDocument();
    });
  });
});
