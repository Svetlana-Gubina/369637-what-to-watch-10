import React from 'react';
import type { FilmItemType } from '../app/app.types';
import { getRatingDescription } from './overview.utils';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import type { CommentType } from '../app/app.types';
import { ApiRoute } from '../../api/constants';
import useApiService from '../../hooks/apiHooks/useApiService';

function Overview(): JSX.Element {
  const { id: searchId } = useParams();
  const { data: comments, isLoading } = useApiService<CommentType[]>(
    `${ApiRoute.Comments}/${searchId}`
  );

  const { description, director, starring } = useOutletContext<FilmItemType>();
  const ratingSum = comments?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.rating,
    0
  );

  return (
    <>
      {!isLoading && comments && comments.length && (
        <div className='film-rating'>
          <div className='film-rating__score'>
            {ratingSum && Number((ratingSum / comments.length).toFixed(1))}
          </div>
          <p className='film-rating__meta'>
            <span className='film-rating__level'>
              {ratingSum && getRatingDescription(ratingSum, comments.length)} -
            </span>
            <span className='film-rating__count'>
              {comments.length} {comments.length > 1 ? 'ratings' : 'rating'}
            </span>
          </p>
        </div>
      )}

      <div className='film-card__text'>
        {description}
        <p className='film-card__director'>
          <strong>{`Director: ${director}`}</strong>
        </p>
        <p className='film-card__starring'>
          <strong>{`${starring.map((s) => `${s}`)}`}</strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
