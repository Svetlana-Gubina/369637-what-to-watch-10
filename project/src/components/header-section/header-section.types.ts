import { PropsWithChildren } from 'react';
import { AuthorizationStatus } from '../private-route/private-route.constants';

export type Props = PropsWithChildren<{
  authorizationStatus: AuthorizationStatus;
  isSignInPage?: boolean;
  additionalClassName?: string;
  children?: JSX.Element;
}>;
