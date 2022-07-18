import { PropsWithChildren } from 'react';
import { AuthorizationStatus } from './private-route.constants';

export type Props = PropsWithChildren<{
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}>;
