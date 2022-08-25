import { renderHook } from '@testing-library/react';
import type { FilmItemType } from '../../types';
import Router from 'react-router-dom';
import useUrlParam from '../useUrlParam/useUrlParam';

const filmDataMock = [
  {
    id: 1,
    name: 'test1',
  },
  {
    id: 1,
    name: 'test1',
  },
] as unknown as FilmItemType[];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('useUrlParam tests', () => {
  it('should return film with provided id', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    const { result } = renderHook(() => useUrlParam(filmDataMock));

    expect(result.current).toBeDefined();
    expect(result.current?.name).toEqual('test1');
  });

  it('should return underfined, if film doesn`t exist', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '3' });
    const { result } = renderHook(() => useUrlParam(filmDataMock));

    expect(result.current).not.toBeDefined();
  });
});
