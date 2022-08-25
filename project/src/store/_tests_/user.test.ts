import userReducer from '../user';
import type { UserDataType } from '../../types';
import { checkAuthAction, loginAction, logoutAction } from '../async-action';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import type { UserState } from '../../types/store';

const userDataMock = {
  avatarUrl: 'test',
  email: 'test',
  id: 1,
  name: 'test',
  token: 'test',
} as UserDataType;
describe('UserReducer tests', () => {
  let state: UserState;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      isLoginError: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userReducer(undefined, { type: 'unknown action' })).toEqual(state);
  });

  it('should update authorizationStatus to "AUTH" in case of checkAuthAction success response', () => {
    expect(
      userReducer(state, { type: checkAuthAction.fulfilled.type })
    ).toEqual({ ...state, authorizationStatus: AuthorizationStatus.Auth });
  });

  it('should update authorizationStatus to "NO_AUTH" in case of checkAuthAction error', () => {
    expect(userReducer(state, { type: checkAuthAction.rejected.type })).toEqual(
      { ...state, authorizationStatus: AuthorizationStatus.NoAuth }
    );
  });

  it('should update authorizationStatus to "NO_AUTH" and remove user data from store in case of logoutAction success', () => {
    expect(userReducer(state, { type: logoutAction.fulfilled.type })).toEqual({
      ...state,
      authorizationStatus: AuthorizationStatus.NoAuth,
    });
  });

  it('should update authorizationStatus to "AUTH" and put user data to store in case of loginAction success response', () => {
    expect(
      userReducer(state, {
        type: loginAction.fulfilled.type,
        payload: userDataMock,
      })
    ).toEqual({
      ...state,
      authorizationStatus: AuthorizationStatus.Auth,
      userData: userDataMock,
    });
  });
  it('should update authorizationStatus to "NO_AUTH" and set isLoginError to true in case of loginAction error', () => {
    expect(userReducer(state, { type: loginAction.rejected.type })).toEqual({
      ...state,
      authorizationStatus: AuthorizationStatus.NoAuth,
      isLoginError: true,
    });
  });
});
