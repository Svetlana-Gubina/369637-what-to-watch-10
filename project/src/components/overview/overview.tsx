import React from 'react';
import type { FilmItemType } from '../app/app.types';
import { CAST_LIMIT } from './overview.constants';
import { useOutletContext } from 'react-router-dom';

function Overview(): JSX.Element {
  const { description, director, cast } = useOutletContext() as FilmItemType;

  return (
    <>
      <div className='film-rating'>
        <div className='film-rating__score'>8,9</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>Very good</span>
          <span className='film-rating__count'>240 ratings</span>
        </p>
      </div>
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
