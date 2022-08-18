import React from 'react';
import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';
import type { Props } from './header.types';

function Header({
  authorizationStatus,
  additionalClassName,
  isSignInPage = false,
  children,
}: Props): JSX.Element {
  return (
    <header className={`page-header ${additionalClassName}`}>
      <Logo />
      {children}
      {!isSignInPage && <UserMenu authorizationStatus={authorizationStatus} />}
    </header>
  );
}

export default Header;
