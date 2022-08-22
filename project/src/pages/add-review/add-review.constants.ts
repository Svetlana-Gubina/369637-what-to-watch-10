import { v4 as uuidv4 } from 'uuid';

export const MAX_RATING = 10;
export const MAX_REVIEW_LENGTH = 400;
export const MIN_REVIEW_LENGTH = 50;

export const RATING_ITEMS = Array.from(Array(MAX_RATING).keys()).map((i) =>
  uuidv4()
);
