import React, { useState } from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import { GENRES, FILMS_TO_SHOW, INITIAL_COUNT } from './catalog.constants';
import { RootState } from '../../store/store.types';
import { createSelector } from 'reselect';
import { checkGenreMathFilter } from './catalog.utils';
import { store } from '../../store';

function Catalog(): JSX.Element {
  const [activeGenre, setActiveGenre] = useState(0);
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const selectFilmsByGenre = createSelector(
    (state: RootState) => state.films.films,
    (films) =>
      films.filter(({ genre }) => checkGenreMathFilter(genre, activeGenre))
  );

  const filmsByGenre = selectFilmsByGenre(store.getState());

  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <ul className='catalog__genres-list'>
        {GENRES.map((genre, i) => (
          <li
            key={genre}
            onClick={() => setActiveGenre(i)}
            className={`catalog__genres-item ${
              activeGenre === i ? 'catalog__genres-item--active' : ''
            }`}
          >
            <button type='button' name={genre} className='catalog__genres-btn'>
              {genre}
            </button>
          </li>
        ))}
      </ul>
      <div className='catalog__films-list'>
        {filmsByGenre
          .slice(0, FILMS_TO_SHOW * count)
          .map(({ id, posterImage, name, previewVideoLink, videoLink }) => (
            <SmallFilmCard
              key={id}
              id={id}
              imgSrc={posterImage}
              name={name}
              previewVideoLink={previewVideoLink}
              videoLink={videoLink}
            />
          ))}
      </div>
      <div className='catalog__more'>
        <button
          onClick={() => setCount((prevState) => (prevState += 1))}
          className='catalog__button'
          type='button'
          disabled={FILMS_TO_SHOW * count >= filmsByGenre.length}
        >
          Show more
        </button>
      </div>
    </section>
  );
}

export default Catalog;
