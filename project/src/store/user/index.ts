import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store.types';

// Define a type for the slice state
type UserState = {
  authorizationStatus: AuthorizationStatus;
};

// Define the initial state using that type
const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const {  } = userSlice.actions;

export default userSlice.reducer;
