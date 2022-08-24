import { RatingDecription } from '../Reviews/Reviews.constants';
import { getRatingDescription } from './overview.utils';

describe('getRatingDescription function test', () => {
  it('if average rating from 5 to 8, description shuild be "Good"', () => {
    const ratingSum = 19.5;
    const count = 3;

    const result = getRatingDescription(ratingSum, count);

    expect(result).toBe(RatingDecription[2]);
  });

  it('if average rating from 3 to 5, description shuild be "Normal"', async () => {
    const ratingSum = 17.2;
    const count = 5;

    const result = getRatingDescription(ratingSum, count);

    expect(result).toBe(RatingDecription[1]);
  });

  it('if average rating from 8 to 10, description shuild be "Very good"', async () => {
    const ratingSum = 83.9;
    const count = 10;

    const result = getRatingDescription(ratingSum, count);

    expect(result).toBe(RatingDecription[3]);
  });

  it('if average rating is 10, description shuild be "Awesome"', async () => {
    const ratingSum = 100;
    const count = 10;

    const result = getRatingDescription(ratingSum, count);

    expect(result).toBe(RatingDecription[4]);
  });
});
