import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../project.constants';
import UserBlock from '../user-block/user-block';
import { AuthorizationStatus } from '../private-route/private-route.constants';
import type { Props } from '../../types';

function UserMenu({
  authorizationStatus,
}: Pick<Props, 'authorizationStatus'>): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    <UserBlock />
  ) : (
    <div className='user-block'>
      <Link to={AppRoute.SignIn} className='user-block__link'>
        Sign in
      </Link>
    </div>
  );
}

export default memo(UserMenu);
