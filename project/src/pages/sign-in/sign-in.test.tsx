import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../project.constants';
import HistoryRouter from '../../components/history-route/history-route';
import SignIn from './sign-in';

const mockStore = configureMockStore();

describe('SignIn page tests', () => {
  it('should render SignIn page when user navigate to "login" url', async () => {
    const history = createMemoryHistory();
    history.push(AppRoute.SignIn);

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(
      screen.getByTestId('test-email'),
      'ivan.petrov@mail.ru'
    );
    await userEvent.type(screen.getByTestId('test-password'), '123456');

    expect(
      screen.getByDisplayValue(/ivan.petrov@mail.ru/i)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should render show warning, if user typed not correct email', async () => {
    const history = createMemoryHistory();
    history.push(AppRoute.SignIn);

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('test-email'), 'keks@99999');
    await userEvent.type(screen.getByTestId('test-password'), '123456');

    expect(
      screen.getByDisplayValue(/Please enter a valid email address/i)
    ).toBeInTheDocument();
  });
});
