export const MAX_RATING = 10;
const SOME_RANDOM_NUM = 1278;

export const RATING_ITEMS = Array.from(Array(MAX_RATING).keys()).map(
  (i) => i + SOME_RANDOM_NUM
);
