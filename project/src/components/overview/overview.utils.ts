import { RatingDecription, RatingLimit } from '../reviews/reviews.constants';

export const getRatingDescription = (ratingSum: number, count: number) => {
  const averageRating = Math.floor(ratingSum / count);
  let index = 0;

  switch (true) {
    case averageRating <= RatingLimit.low:
      index = 0;
      break;
    case averageRating >= RatingLimit.low &&
      averageRating < RatingLimit.moderate:
      index = 1;
      break;
    case averageRating >= RatingLimit.moderate &&
      averageRating < RatingLimit.high:
      index = 2;
      break;
    case averageRating >= RatingLimit.high &&
      averageRating < RatingLimit.veryHigh:
      index = 3;
      break;
    case averageRating === RatingLimit.veryHigh:
      index = 4;
      break;
  }

  return RatingDecription[index];
};
