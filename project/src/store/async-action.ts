import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../api/constants';
import type { AppDispatch, RootState } from './store.types';
import type { FilmItemType, UserDataType } from '../components/app/app.types';
import { saveToken, dropToken } from '../services/token';
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

export const fetchFilmDataById = createAsyncThunk<
  FilmItemType,
  number,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('films/fetchFilmDataById', async (filmId, { dispatch, extra: api }) => {
  const { data } = await api.get<FilmItemType>(`${ApiRoute.Films}/${filmId}`);
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

// Favorite
export const fetchFavoriteFilms = createAsyncThunk<
  FilmItemType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('films/fetchFavoriteFilms', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<FilmItemType[]>(ApiRoute.Favorite);
  return data;
});

type UpdateStatusAttributes = {
  filmId: number;
  status: number;
};

export const updateFilmIsFavoriteState = createAsyncThunk<
  void,
  UpdateStatusAttributes,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('films/updateFilmIsFavoriteState', async (attr, { dispatch, extra: api }) => {
  await api.post(`${ApiRoute.Favorite}/${attr.filmId}/${attr.status}`);
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
  saveToken(data.token);
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
  dropToken();
});
