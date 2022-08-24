import { FilmItemType } from '../index';
import type { UserDataType } from '../index';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import { store } from '../../store';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type CommentState = {
  isCommentSuccess: boolean;
  isCommentError: boolean;
};

export type FilmsState = {
  isFilmDataLoaded: boolean;
  isPromoDataLoaded: boolean;
  filmDataError: boolean;
  promoDataError: boolean;
  films: FilmItemType[];
  promo: FilmItemType | null;
};

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserDataType | null;
  isLoginError: boolean;
};
