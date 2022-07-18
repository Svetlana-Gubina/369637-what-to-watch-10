import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from './private-route.constants';
import { AppRoute } from '../../project.constants';
import type { Props } from './private-root.types';

function PrivateRoot({ authorizationStatus, children }: Props): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoot;
