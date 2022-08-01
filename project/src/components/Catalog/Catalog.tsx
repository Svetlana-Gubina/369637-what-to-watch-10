import React, { useState } from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import { PROMO_ID } from '../../mocks/films';
import { GENRES, FILMS_TO_SHOW, INITIAL_COUNT } from './catalog.constants';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { chooseGenreAction } from '../../store/action';

function Catalog(): JSX.Element {
  const [activeGenre, setActiveGenre] = useState(0);
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const filmsByGenre = useAppSelector((state) => state.filmsByGenre);
  const dispatch = useAppDispatch();

  const handleChooseGenre = (
    evt:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ): void => {
    evt.preventDefault();

    const btn = evt.target as HTMLButtonElement;
    dispatch(chooseGenreAction(btn.name));
  };

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
            <button
              type='button'
              name={genre}
              onClick={(evt) => handleChooseGenre(evt)}
              className='catalog__genres-btn'
            >
              {genre}
            </button>
          </li>
        ))}
      </ul>
      <div className='catalog__films-list'>
        {filmsByGenre
          .filter(({ id }) => id !== PROMO_ID)
          .slice(0, FILMS_TO_SHOW * count)
          .map(({ id, imgSrc, name }) => (
            <SmallFilmCard key={id} id={id} imgSrc={imgSrc} name={name} />
          ))}
      </div>
      <div className='catalog__more'>
        <button
          onClick={() => setCount((prevState) => (prevState += 1))}
          className='catalog__button'
          type='button'
          disabled={
            FILMS_TO_SHOW * count >=
            filmsByGenre.filter(({ id }) => id !== PROMO_ID).length
          }
        >
          Show more
        </button>
      </div>
    </section>
  );
}

export default Catalog;
