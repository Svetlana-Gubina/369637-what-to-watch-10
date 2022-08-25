import { checkGenreMathFilter } from './catalogSection.utils';

describe('checkGenreMathFilter function test', () => {
  it('should return true for "all genres"', () => {
    const testGenre = 'Comedy';

    // 'All genres' index
    const activeGenre = 0;
    const result = checkGenreMathFilter(testGenre, activeGenre);

    expect(result).toBeDefined();
    expect(result).toBe(true);
  });

  it('should return true for corresponding genre', () => {
    const testGenre = 'Comedy';

    // 'Comedies' index
    const activeGenre = 1;
    const result = checkGenreMathFilter(testGenre, activeGenre);

    expect(result).toBeDefined();
    expect(result).toBe(true);
  });

  it('should return false, if genre doesn`t match', () => {
    const testGenre = 'Crime';

    // 'Comedies' index
    const activeGenre = 1;
    const result = checkGenreMathFilter(testGenre, activeGenre);

    expect(result).toBeDefined();
    expect(result).toBe(false);
  });
});
