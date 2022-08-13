import React from 'react';
import dayjs from 'dayjs';
import type { CommentType } from '../app/app.types';

function ReviewItem({
  user,
  comment,
  date,
  rating,
}: Omit<CommentType, 'id'>): JSX.Element {
  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{comment}</p>
        <footer className='review__details'>
          <cite className='review__author'>{user.name}</cite>
          <time className='review__date' dateTime={date}>
            {dayjs(date).format('MMMM D, YYYY')}
          </time>
        </footer>
      </blockquote>
      <div className='review__rating'>{rating}</div>
    </div>
  );
}

export default ReviewItem;
