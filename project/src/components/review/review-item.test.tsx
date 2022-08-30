import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import ReviewItem from './review-item';

const history = createMemoryHistory();

const testUserData = {
  user: {
    id: 111,
    name: 'test',
  },
  comment: 'Some random text',
  date: new Date().toDateString(),
  rating: 10,
};

describe('ReviewItem component test', () => {
  it('should render correctly', async () => {
    const { user, comment, date, rating } = testUserData;

    render(
      <HistoryRouter history={history}>
        <ReviewItem user={user} comment={comment} date={date} rating={rating} />
      </HistoryRouter>
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(/Some random text/)).toBeInTheDocument();
  });
});
