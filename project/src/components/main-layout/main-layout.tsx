import React, { useState, useEffect } from 'react';
import { Link, Navigate, NavLink, Outlet, useParams } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import SmallFilmCard from '../small-film-card/small-film-card';
import { AppRoute } from '../../project.constants';
import type { Props } from './main-layout.types';
import { shuffleFilms } from '../../project.utils';
import { getSimilarFilms } from './main-layout.utils';
import { NAV_LIST } from './main-layout.constants';

function MainLayout({ films }: Props): JSX.Element {
  const params = useParams();
  const searchId = params.id;
  const currentFilm = films.find((film) => film.id.toString() === searchId);
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [filmsLikeThis, setFilmsLikeThis] = useState(
    getSimilarFilms(films, currentFilm)
  );

  useEffect(() => {
    const moreLikeThis = shuffleFilms(getSimilarFilms(films, currentFilm));
    setFilmsLikeThis(moreLikeThis);
  }, [currentFilm, films]);

  if (!currentFilm) {
    return <Navigate to={AppRoute.PageNotFound} />;
  }

  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={currentFilm?.imgSrc} alt={currentFilm?.name} />
          </div>
          <h1 className='visually-hidden'>WTW</h1>
          <Header />
          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{currentFilm?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{currentFilm?.genre}</span>
                <span className='film-card__year'>{currentFilm?.year}</span>
              </p>
              <div className='film-card__buttons'>
                <button
                  className='btn btn--play film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 19' width={19} height={19}>
                    <use xlinkHref='#play-s' />
                  </svg>
                  <span>Play</span>
                </button>
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
                <Link
                  to={`/films/${currentFilm?.id}/review`}
                  className='btn film-card__button'
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img
                src={currentFilm?.imgSrc}
                alt={currentFilm?.name}
                width={218}
                height={327}
              />
            </div>

            <div className='film-card__desc'>
              <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                  {NAV_LIST.map((navItem, i) => (
                    <li
                      key={navItem}
                      onClick={() => setActiveNavItem(i)}
                      className={`film-nav__item ${
                        activeNavItem === i ? 'film-nav__item--active' : ''
                      }`}
                    >
                      <NavLink
                        to={`/films/${
                          currentFilm?.id
                        }/${navItem.toLocaleLowerCase()}`}
                        className='film-nav__link'
                      >
                        {navItem}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <Outlet context={currentFilm} />
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          <div className='catalog__films-list'>
            {filmsLikeThis.map(({ id, imgSrc, name }) => (
              <SmallFilmCard key={id} id={id} imgSrc={imgSrc} name={name} />
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
