import React from 'react';
import { render, screen } from '@testing-library/react';
import Router from 'react-router-dom';
import Reviews from '../reviews/reviews';
import useApiService from '../../hooks/apiHooks/useApiService';

const commentsDataMock = [
  {
    comment: 'short comment',
    date: new Date().toDateString(),
    id: 1,
    rating: 10,
    user: {
      id: 111,
      name: 'test1',
    },
  },
  {
    comment: 'long long comment',
    date: new Date().toDateString(),
    id: 2,
    rating: 10,
    user: {
      id: 222,
      name: 'test2',
    },
  },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../hooks/apiHooks/useApiService');

const mockuseApiService = useApiService as jest.MockedFunction<
  typeof useApiService
>;

describe('Reviews component test', () => {
  it('should render correctly', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    mockuseApiService.mockReturnValue({
      data: commentsDataMock,
      isLoading: false,
      isError: false,
    });

    render(<Reviews />);

    expect(screen.getByText(/long long comment/i)).toBeInTheDocument();
    expect(screen.getByText(/test2/i)).toBeInTheDocument();
  });
});
