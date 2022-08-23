import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';
import { AuthorizationStatus } from '../private-route/private-route.constants';

describe('Header component tests', () => {
  it('should render component with children passed', () => {
    const authorizationStatus = AuthorizationStatus.NoAuth;
    const element = <div>Hello!</div>;
    render(
      <Header authorizationStatus={authorizationStatus}>{element}</Header>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('shouldn`t render user menu for Sign in page', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(<Header authorizationStatus={authorizationStatus} isSignInPage />);

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should render user menu inside, if user is authorized', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(<Header authorizationStatus={authorizationStatus} isSignInPage />);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
