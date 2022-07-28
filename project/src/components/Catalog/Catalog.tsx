import React from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import { PROMO_ID } from '../../mocks/films';
import type { Props } from './catalog.types';

function Catalog({ films }: Props): JSX.Element {
  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <div className='catalog__films-list'>
        {films
          .filter(({ id }) => id !== PROMO_ID)
          .map(({ id, imgSrc, name }) => (
            <SmallFilmCard key={id} id={id} imgSrc={imgSrc} name={name} />
          ))}
      </div>
    </section>
  );
}

export default Catalog;
