import React, { useEffect, useState } from 'react';
import type { FilmItemType } from '../app/app.types';
import { RatingDecription } from '../reviews/reviews.constants';
import { CAST_LIMIT } from './overview.constants';
import { getRatingDescription } from './overview.utils';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import type { CommentType } from '../app/app.types';
// import LoadingOverlay from '../loading-overlay/loading-overlay';
import { api } from '../../store';
import { ApiRoute } from '../../api/constants';
// import useApiService from '../../hooks/apiHooks/useApiService';

function Overview(): JSX.Element {
  const { id: searchId } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`${ApiRoute.Comments}/${searchId}`)
      .then((res) => {
        setComments(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [searchId]);

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
              {ratingSum &&
                RatingDecription[Math.floor(ratingSum / comments.length)]}
            </span>
            <span className='film-rating__count'>
              {comments.length} ratings{' '}
              {ratingSum && getRatingDescription(ratingSum, comments.length)}
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
          <strong>
            {`Starring: ${starring.slice(0, CAST_LIMIT)} and
            other`}
          </strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
