import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import type { UserDataType } from '../../types';
import { checkAuthAction, loginAction, logoutAction } from '../async-action';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from '../../types/store';

// Define the initial state using that type
const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  isLoginError: false,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(
        loginAction.fulfilled,
        (state, action: PayloadAction<UserDataType>) => {
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.userData = action.payload;
          state.isLoginError = false;
        }
      )
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoginError = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  },
});

export default userSlice.reducer;
