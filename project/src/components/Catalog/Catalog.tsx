import React from 'react';
import SmallFilmCard from '../SmallFilmCard/SmallFilmCard';
import type { Props } from './Catalog.types';

function Catalog({ films }: Props): JSX.Element {
  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <div className='catalog__films-list'>
        {films.map(({ id, imgSrc, name, link }) => (
          <SmallFilmCard key={id} imgSrc={imgSrc} name={name} link={link} />
        ))}
      </div>
    </section>
  );
}

export default Catalog;
