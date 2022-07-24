import React from 'react';
import { Link } from 'react-router-dom';
import type { Props } from './small-film-card.types';

function SmallFilmCard({ id, imgSrc, name }: Props): JSX.Element {
  return (
    <article className='small-film-card catalog__films-card'>
      <div className='small-film-card__image'>
        <img src={imgSrc} alt={name} width={280} height={175} />
      </div>
      <h3 className='small-film-card__title'>
        <Link to={`/films/${id}`} className='small-film-card__link'>
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
