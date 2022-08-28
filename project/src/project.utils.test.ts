import { getCurrentFilm } from './project.utils';
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
