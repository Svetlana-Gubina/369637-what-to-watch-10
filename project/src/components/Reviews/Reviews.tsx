import React from 'react';
import ReviewItem from '../review/review';
import { MAX_REVIEWS_TO_SHOW } from './reviews.constants';
import type { FilmItemType } from '../app/app.types';
import { useOutletContext } from 'react-router-dom';

function Reviews(): JSX.Element {
  const { reviews } = useOutletContext<FilmItemType>();

  return (
    <div className='film-card__reviews film-card__row'>
      {reviews && reviews.length ? (
        <>
          <div className='film-card__reviews-col'>
            {reviews
              ?.slice(0, MAX_REVIEWS_TO_SHOW)
              .map(({ id, author, text, date, rate }) => (
                <ReviewItem
                  key={id}
                  author={author}
                  text={text}
                  date={date}
                  rate={rate}
                />
              ))}
          </div>

          <div className='film-card__reviews-col'>
            {reviews
              ?.slice(MAX_REVIEWS_TO_SHOW, MAX_REVIEWS_TO_SHOW * 2)
              .map(({ id, author, text, date, rate }) => (
                <ReviewItem
                  key={id}
                  author={author}
                  text={text}
                  date={date}
                  rate={rate}
                />
              ))}
          </div>
        </>
      ) : (
        <div>There are no reviews yet. be the first!</div>
      )}
    </div>
  );
}

export default Reviews;
