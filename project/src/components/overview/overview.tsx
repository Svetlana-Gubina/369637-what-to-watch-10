import React from 'react';
import type { FilmItemType } from '../app/app.types';
import { RatingDecription } from '../reviews/reviews.constants';
import { CAST_LIMIT } from './overview.constants';
import { useOutletContext } from 'react-router-dom';

function Overview(): JSX.Element {
  const { description, director, cast, reviews } =
    useOutletContext<FilmItemType>();
  const ratingSum = reviews?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.rate,
    0
  );

  return (
    <>
      {reviews && reviews.length && (
        <div className='film-rating'>
          <div className='film-rating__score'>
            {ratingSum && Number((ratingSum / reviews.length).toFixed(1))}
          </div>
          <p className='film-rating__meta'>
            <span className='film-rating__level'>
              {ratingSum &&
                RatingDecription[Math.floor(ratingSum / reviews.length)]}
            </span>
            <span className='film-rating__count'>{reviews.length} ratings</span>
          </p>
        </div>
      )}

      <div className='film-card__text'>
        {description}
        <p className='film-card__director'>
          <strong>{`Director: ${director}`}</strong>
        </p>
        <p className='film-card__starring'>
          <strong>
            {`Starring: ${cast?.split(',').slice(0, CAST_LIMIT)} and
            other`}
          </strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
