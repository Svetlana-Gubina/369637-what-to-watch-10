import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {
  GENRES,
  FILMS_TO_SHOW,
  INITIAL_COUNT,
} from './welcome-screen.constants';
import { PROMO_ID } from '../../mocks/films';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import type { Props } from '../../components/app/app.types';

function WelcomeScreen({ films, authorizationStatus }: Props): JSX.Element {
  const [activeGenre, setActiveGenre] = useState(0);
  const [count, setCount] = useState(INITIAL_COUNT);
  const promo = films.find((f) => f.id === PROMO_ID);

  return (
    <>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={promo?.imgSrc} alt={promo?.name} />
        </div>
        <h1 className='visually-hidden'>WTW</h1>
        <Header authorizationStatus={authorizationStatus} />
        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img
                src={promo?.posterSrc}
                alt={`${promo?.name} poster`}
                width={218}
                height={327}
              />
            </div>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{promo?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{promo?.genre}</span>
                <span className='film-card__year'>{promo?.year}</span>
              </p>
              <div className='film-card__buttons'>
                <Link
                  className='btn btn--play film-card__button'
                  to={`/player/${promo?.id}`}
                >
                  <svg viewBox='0 0 19 19' width={19} height={19}>
                    <use xlinkHref='#play-s' />
                  </svg>
                  <span>Play</span>
                </Link>

                {authorizationStatus === AuthorizationStatus.Auth && (
                  <button
                    className='btn btn--list film-card__button'
                    type='button'
                  >
                    <svg viewBox='0 0 19 20' width={19} height={20}>
                      <use xlinkHref='#add' />
                    </svg>
                    <span>My list</span>
                    <span className='film-card__count'>9</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='page-content'>
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
                <Link to='/' className='catalog__genres-link'>
                  {genre}
                </Link>
              </li>
            ))}
          </ul>
          <div className='catalog__films-list'>
            {films
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
                films.filter(({ id }) => id !== PROMO_ID).length
              }
            >
              Show more
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default WelcomeScreen;
