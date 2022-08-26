import {
  fetchAllFilms,
  fetchPromo,
  addComment,
  checkAuthAction,
  loginAction,
  logoutAction,
} from './async-action';
import { createApi } from '../api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { ApiRoute } from '../api/constants';
import type { RootState } from '../types/store';
import { configureMockStore } from '@jedmao/redux-mock-store';
import type { FilmItemType } from '../types';
import { redirectToRoute } from './action';
import { Action } from '@reduxjs/toolkit';

describe('Async actions tests', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    RootState,
    Action,
    ThunkDispatch<RootState, typeof api, Action>
  >(middlewares);

  it('should dispatch checkAuthAction action with fulfilled type in case of response ok', async () => {
    mockApi.onGet(ApiRoute.Login).reply(200, {});

    const store = mockStore();

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch checkAuthAction action with rejected type in case error', async () => {
    mockApi.onGet(ApiRoute.Login).reply(401, {
      error: 'error',
    });

    const store = mockStore();

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type,
    ]);
  });

  it('should dispatch loginAction action in case of successful login', async () => {
    const userData = { email: 'default@mail.ru', password: '123456' };
    mockApi
      .onPost(ApiRoute.Login, userData)
      .reply(200, { token: 'test', avatarUrl: 'test' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(userData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(
      1,
      'WTW_auth_token',
      'test'
    );
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(
      2,
      'WTW_user_avatar',
      'test'
    );
  });

  it('should dispatch Logout action in case of successful logout', async () => {
    mockApi.onDelete(ApiRoute.Logout).reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).toHaveBeenNthCalledWith(
      1,
      'WTW_auth_token'
    );
    expect(Storage.prototype.removeItem).toHaveBeenNthCalledWith(
      2,
      'WTW_user_avatar'
    );
  });

  it('should dispatch fetchPromo action with fulfilled type in case of response ok', async () => {
    const promoData = {
      id: 1,
      name: 'test 1',
    } as unknown as FilmItemType;
    mockApi.onGet(ApiRoute.Promo).reply(200, promoData);

    const store = mockStore();

    await store.dispatch(fetchPromo());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromo.pending.type,
      fetchPromo.fulfilled.type,
    ]);
  });

  it('should dispatch fetchAllFilms action with fulfilled type in case of response ok', async () => {
    const filmData = [
      {
        id: 1,
        name: 'test 1',
      },
      {
        id: 2,
        name: 'test 2',
      },
    ] as unknown as FilmItemType[];
    mockApi.onGet(ApiRoute.Films).reply(200, filmData);

    const store = mockStore();

    await store.dispatch(fetchAllFilms());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchAllFilms.pending.type,
      fetchAllFilms.fulfilled.type,
    ]);
  });

  it('should dispatch addComment action and redirect to /reviews', async () => {
    const userdata = { comment: 'test', rating: 10 };
    const testFilmId = 1;

    mockApi
      .onPost(`${ApiRoute.Comments}/${testFilmId}`, userdata)
      .reply(200, [userdata]);

    const store = mockStore();

    await store.dispatch(
      addComment({
        filmId: testFilmId,
        data: userdata,
      })
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addComment.pending.type,
      redirectToRoute.type,
      addComment.fulfilled.type,
    ]);
  });

  it('should dispatch addComment action with rejected state in case of error', async () => {
    const userdata = { comment: 'test', rating: 10 };
    const testFilmId = 1;

    mockApi.onPost(`${ApiRoute.Comments}/${testFilmId}`, userdata).reply(401, {
      error: 'error',
    });

    const store = mockStore();

    await store.dispatch(
      addComment({
        filmId: testFilmId,
        data: userdata,
      })
    );

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addComment.pending.type,
      addComment.rejected.type,
    ]);
  });
});
