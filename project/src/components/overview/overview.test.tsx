import React from 'react';
import { render, screen } from '@testing-library/react';
import Router from 'react-router-dom';
import Overview from '../overview/overview';

const mockData = {
  description: 'test description',
  director: 'test director',
  starring: ['test', 'test'],
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useOutletContext: jest.fn(),
}));

describe('Overview component test', () => {
  it('should render correctly', () => {
    jest.spyOn(Router, 'useOutletContext').mockReturnValue(mockData);
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });

    render(<Overview />);

    expect(screen.getByText(/test director/i)).toBeInTheDocument();
  });
});
