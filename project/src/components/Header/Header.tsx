import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute } from '../../project.constants';
import UserBlock from '../user-block/user-block';
import { AuthorizationStatus } from '../private-route/private-route.constants';
import type { Props } from '../app/app.types';

function Header({ authorizationStatus }: Omit<Props, 'films'>): JSX.Element {
  return (
    <header
      className={`page-header ${authorizationStatus ? 'film-card__head' : ''}`}
    >
      <Logo />
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <UserBlock />
      ) : (
        <div className='user-block'>
          <Link to={AppRoute.SignIn} className='user-block__link'>
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
