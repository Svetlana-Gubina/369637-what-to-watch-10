import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlayerComponent from '../../components/player-component/player-component';
import { TIMEOUT } from './small-film-card.constants';
import type { Props } from './small-film-card.types';

function SmallFilmCard({
  id,
  imgSrc,
  name,
  previewVideoLink,
}: Props): JSX.Element {
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isCursonOnCard, setIsCursonOnCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCursonOnCard) {
        setIsVideoActive(true);
      } else {
        setIsVideoActive(false);
      }
    }, TIMEOUT);

    return () => clearTimeout(timer);
  }, [isCursonOnCard]);

  return (
    <article
      onMouseEnter={() => setIsCursonOnCard(true)}
      onMouseLeave={() => setIsCursonOnCard(false)}
      className='small-film-card catalog__films-card'
    >
      {isVideoActive ? (
        <PlayerComponent
          id={id}
          imgSrc={imgSrc}
          name={name}
          previewVideoLink={previewVideoLink}
          isFullPage={false}
        />
      ) : (
        <Link to={`/films/${id}`} className='small-film-card__link'>
          <div className='small-film-card__image'>
            <img src={imgSrc} alt={name} width={280} height={175} />
          </div>
          <h3 className='small-film-card__title'>{name}</h3>
        </Link>
      )}
    </article>
  );
}

export default SmallFilmCard;
