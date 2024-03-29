import React, { useMemo } from 'react';
import ReviewItem from '../review/review-item';
import { MAX_REVIEWS_TO_SHOW } from './reviews-section.constants';
import { useParams } from 'react-router-dom';
import type { CommentType } from '../../types';
import LoadingOverlay from '../loading-overlay/loading-overlay';
import { ApiRoute } from '../../api/constants';
import useApiService from '../../hooks/apiHooks/useApiService';

function ReviewsSection(): JSX.Element {
  const { id: searchId } = useParams();
  const { data: comments, isLoading } = useApiService<CommentType[]>(
    `${ApiRoute.Comments}/${searchId}`
  );
  const commentsToRender = useMemo(
    () =>
      comments?.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [comments]
  );

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className='film-card__reviews film-card__row'>
      {comments && comments.length ? (
        <>
          <div className='film-card__reviews-col'>
            {commentsToRender
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
            {commentsToRender
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
        <div className='no-reviews'>
          There are no reviews yet. Be the first!
        </div>
      )}
    </div>
  );
}

export default ReviewsSection;
