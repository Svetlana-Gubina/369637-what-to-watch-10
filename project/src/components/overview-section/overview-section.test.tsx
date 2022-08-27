import React from 'react';
import { render, screen } from '@testing-library/react';
import Router from 'react-router-dom';
import Overview from './overview-section';
import type { CommentType } from '../../types';
import useApiService from '../../hooks/apiHooks/useApiService';

const mockData = {
  description: 'test description',
  director: 'test director',
  starring: ['test', 'test'],
};

const commentsMock = [
  {
    comment: 'test',
    id: 1,
    rating: 10,
  },
  {
    comment: 'test',
    id: 2,
    rating: 10,
  },
] as unknown as CommentType[];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useOutletContext: jest.fn(),
}));

jest.mock('../../hooks/apiHooks/useApiService');

const mockuseApiService = useApiService as jest.MockedFunction<
  typeof useApiService
>;

describe('Overview component test', () => {
  it('should render correctly', () => {
    jest.spyOn(Router, 'useOutletContext').mockReturnValue(mockData);
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    mockuseApiService.mockReturnValue({
      data: commentsMock,
      isLoading: false,
      isError: false,
    });

    render(<Overview />);

    expect(screen.getByText(/test director/i)).toBeInTheDocument();
    expect(screen.getByText(/2 ratings/i)).toBeInTheDocument();
  });
});
