import React, { useState, useEffect } from 'react';
import ReviewItem from '../review/review';
import { MAX_REVIEWS_TO_SHOW } from './reviews.constants';
import { useParams } from 'react-router-dom';
import type { CommentType } from '../app/app.types';
import LoadingOverlay from '../loading-overlay/loading-overlay';
import { api } from '../../store';
import { ApiRoute } from '../../api/constants';
// import { useOutletContext } from 'react-router-dom';

function Reviews(): JSX.Element {
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

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className='film-card__reviews film-card__row'>
      {comments && comments.length ? (
        <>
          <div className='film-card__reviews-col'>
            {comments
              ?.slice(0, MAX_REVIEWS_TO_SHOW)
              .map(({ id, user, comment, date, rating }) => (
                <ReviewItem
                  key={id}
                  user={user}
                  comment={comment}
                  date={date}
                  rating={rating}
                />
              ))}
          </div>

          <div className='film-card__reviews-col'>
            {comments
              ?.slice(MAX_REVIEWS_TO_SHOW, MAX_REVIEWS_TO_SHOW * 2)
              .map(({ id, user, comment, date, rating }) => (
                <ReviewItem
                  key={id}
                  user={user}
                  comment={comment}
                  date={date}
                  rating={rating}
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
