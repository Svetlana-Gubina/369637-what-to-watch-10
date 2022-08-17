import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../api/constants';
import type { AppDispatch, RootState } from './store.types';
import type { FilmItemType, UserDataType } from '../types';
import {
  saveItem,
  dropItem,
  AUTH_TOKEN_KEY_NAME,
  USER_AVATAR_KEY_NAME,
} from '../services/localStorageItem';
import { AxiosInstance } from 'axios';

// Films
export const fetchAllFilms = createAsyncThunk<
  FilmItemType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('films/fetchAllFilms', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<FilmItemType[]>(ApiRoute.Films);
  return data;
});

export const fetchPromo = createAsyncThunk<
  FilmItemType,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('films/fetchPromo', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<FilmItemType>(ApiRoute.Promo);
  return data;
});

// Comments
type AddCommentAttributes = {
  filmId: number;
  data: { comment: string; rating: number };
};

export const addComment = createAsyncThunk<
  void,
  AddCommentAttributes,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('comment/addComment', async (attr, { dispatch, extra: api }) => {
  await api.post(`${ApiRoute.Comments}/${attr.filmId}`, attr.data);
});

// User
export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api.get(ApiRoute.Login);
});

type LoginAttributes = {
  email: string;
  password: string;
};

export const loginAction = createAsyncThunk<
  UserDataType,
  LoginAttributes,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserDataType>(ApiRoute.Login, {
    email,
    password,
  });
  saveItem(AUTH_TOKEN_KEY_NAME, data.token);
  saveItem(USER_AVATAR_KEY_NAME, data.avatarUrl);
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dropItem(AUTH_TOKEN_KEY_NAME);
  dropItem(USER_AVATAR_KEY_NAME);
});
