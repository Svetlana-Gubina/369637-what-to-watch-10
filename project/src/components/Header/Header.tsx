import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute } from '../../project.constants';
import { AuthorizationStatus } from '../private-route/private-route.constants';
import type { Props } from '../app/app.types';

function Header({ authorizationStatus }: Omit<Props, 'films'>): JSX.Element {
  const avatarHandleClick = (): JSX.Element => (
    <Navigate to={AppRoute.MyList} />
  );

  return (
    <header
      className={`page-header ${authorizationStatus ? 'film-card__head' : ''}`}
    >
      <Logo />
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <ul className='user-block'>
          <li className='user-block__item'>
            <div
              className='user-block__avatar'
              onClick={() => avatarHandleClick()}
            >
              <img
                src='img/avatar.jpg'
                alt='User avatar'
                width={63}
                height={63}
              />
            </div>
          </li>
          <li className='user-block__item'>
            <Link to='/' className='user-block__link'>
              Sign out
            </Link>
          </li>
        </ul>
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
