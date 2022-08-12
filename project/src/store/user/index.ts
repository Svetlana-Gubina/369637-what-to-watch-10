import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import type { UserDataType } from '../../components/app/app.types';
import { checkAuthAction, loginAction, logoutAction } from '../async-action';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store.types';

// Define a type for the slice state
type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserDataType | null;
};

// Define the initial state using that type
const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
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
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  },
});

export default userSlice.reducer;
