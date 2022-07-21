import React from 'react';
import dayjs from 'dayjs';
import type { Review } from '../app/app.types';

function ReviewItem({
  author,
  text,
  date,
  rate,
}: Omit<Review, 'id'>): JSX.Element {
  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{text}</p>
        <footer className='review__details'>
          <cite className='review__author'>{author}</cite>
          <time className='review__date' dateTime={date.toDateString()}>
            {dayjs(date).format('MMMM D, YYYY')}
          </time>
        </footer>
      </blockquote>
      <div className='review__rating'>{rate}</div>
    </div>
  );
}

export default ReviewItem;
