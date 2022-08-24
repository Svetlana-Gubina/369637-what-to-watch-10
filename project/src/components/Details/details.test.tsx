import React from 'react';
import { render, screen } from '@testing-library/react';
import Router from 'react-router-dom';
import Details from '../details/details';

const mockData = {
  released: 2020,
  genre: 'test genre',
  director: 'test director',
  starring: ['test', 'test'],
  runTime: 60,
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

describe('Details component test', () => {
  it('should render correctly', () => {
    jest.spyOn(Router, 'useOutletContext').mockReturnValue(mockData);

    render(<Details />);

    expect(screen.getByText(/test director/i)).toBeInTheDocument();
  });
});
