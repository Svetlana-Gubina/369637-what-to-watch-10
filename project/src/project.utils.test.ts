import { getCurrentFilm, handleFilmStateUpdate } from './project.utils';
import { waitFor } from '@testing-library/react';
import { createApi } from './api';
import MockAdapter from 'axios-mock-adapter';
import { ApiRoute } from './api/constants';
import type { FilmItemType } from './types';

const mockFilmdata = [
  {
    id: '111',
    name: 'test film 1',
  },
  {
    id: '222',
    name: 'test film 2',
  },
] as unknown as FilmItemType[];
describe('getCurrentFilm function test', () => {
  it('should return film with correct id', () => {
    const result = getCurrentFilm(mockFilmdata, '111');

    expect(result).toBeDefined();
    expect(result).toEqual(mockFilmdata[0]);
  });

  it('should return underfined, if film with passed id doesn`t exist', () => {
    const result = getCurrentFilm(mockFilmdata, '4444');

    expect(result).not.toBeDefined();
  });
});

// todo: add tests for handleFilmStateUpdate
describe('handleFilmStateUpdate function test', () => {
  it.skip('should call proper callbacks i case of successfull response', async () => {
    const api = createApi();
    const mockApi = new MockAdapter(api);
    const testFilmId = 1;
    const testFilmStatus = true;
    const setFilmStatus = jest.fn();
    const setIsFilmStatusUpdateError = jest.fn();
    const mockedEvent = {
      target: {},
      preventDefault: jest.fn,
    } as unknown as React.KeyboardEvent<HTMLButtonElement>;
    const responseData = {
      id: 1,
      name: 'test 1',
      isFavorite: false,
    } as unknown as FilmItemType;

    mockApi
      .onPost(`${ApiRoute.Favorite}/${testFilmId}/${Number(!testFilmStatus)}`)
      // .reply(401, {
      // error: 'test',
      // });
      .reply(200, responseData);

    await handleFilmStateUpdate(
      mockedEvent,
      testFilmId,
      testFilmStatus,
      setFilmStatus,
      setIsFilmStatusUpdateError
    );

    await expect(setFilmStatus).toHaveBeenCalled();

    // expect(setFilmStatus).toBeCalled();
    // expect(setIsFilmStatusUpdateError).toBeCalledWith(false);
  });
  // it('should call proper callbacks i case of error', async () => {});
});
