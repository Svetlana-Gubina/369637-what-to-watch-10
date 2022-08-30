import AddReview from './add-review';
import { render, screen, waitFor } from '@testing-library/react';
import useUrlParam from '../../hooks/useUrlParam/useUrlParam';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import HistoryRouter from '../../components/history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import type { FilmItemType } from '../../types';
import { AppRoute } from '../../project.constants';
import { Provider } from 'react-redux';

const mockFilmdata = [
  {
    id: '111',
    name: 'test film 1',
  },
  {
    id: '222',
    name: 'test film 2',
  },
] as unknown as FilmItemType[];
const mockStore = configureMockStore();
const store = mockStore({
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  comment: {
    isCommentSuccess: false,
    isCommentError: false,
  },
});

jest.mock('../../hooks/useUrlParam/useUrlParam');

const mockuseUrlParam = useUrlParam as jest.MockedFunction<typeof useUrlParam>;

describe('AddReview page tests', () => {
  it('should render AddReview page when user navigate to "/addreview" url', async () => {
    const history = createMemoryHistory();
    history.push(AppRoute.AddReview);
    mockuseUrlParam.mockReturnValue(mockFilmdata[0]);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview
            films={mockFilmdata}
            authorizationStatus={AuthorizationStatus.Auth}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('test-textarea')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('test-textarea'), 'Awesome');

    await waitFor(() => {
      expect(screen.getByTestId('test-submit')).toBeDisabled();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Please type at least 50 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('shouldn`t show warning message if form is properly filled in', async () => {
    const history = createMemoryHistory();
    history.push(AppRoute.AddReview);
    mockuseUrlParam.mockReturnValue(mockFilmdata[0]);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview
            films={mockFilmdata}
            authorizationStatus={AuthorizationStatus.Auth}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId(/test-textarea/i)).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Rating 1'));
    await userEvent.type(
      screen.getByTestId('test-textarea'),
      'No, I`m not making this up, and yes, I`m writing this review sober. I haven`t even gotten to the part where both brothers kick the bucket when a power plant explosion interrupts their sibling rivalry. All of this information is crammed into the opening credits'
    );

    await waitFor(() => {
      expect(screen.getByTestId('test-submit')).not.toBeDisabled();
    });
    await waitFor(() => {
      expect(
        screen.queryByText(/Please type at least 50 characters/i)
      ).not.toBeInTheDocument();
    });
  });
});
