import React, { useState, useEffect } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { AppRoute } from '../../project.constants';
import type { Props } from './main-layout.types';
import { getSimilarFilms } from './main-layout.utils';
import { NAV_LIST } from './main-layout.constants';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import useUrlParam from '../../hooks/useUrlParam/useUrlParam';

function MainLayout({ films, authorizationStatus }: Props): JSX.Element {
  const location = useLocation();
  const currentNavItem = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1
  );
  const reg = new RegExp(currentNavItem, 'i');
  const subPageCurrentIndex = NAV_LIST.findIndex((n) => n.match(reg));
  const currentFilm = useUrlParam(films);
  const [activeNavItem, setActiveNavItem] = useState(
    subPageCurrentIndex > 0 ? subPageCurrentIndex : 0
  );

  const [filmsLikeThis, setFilmsLikeThis] = useState(
    getSimilarFilms(films, currentFilm)
  );

  useEffect(() => {
    setFilmsLikeThis(getSimilarFilms(films, currentFilm));
  }, [currentFilm, films]);

  if (!currentFilm) {
    return <Navigate to={AppRoute.PageNotFound} />;
  }

  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
          </div>
          <h1 className='visually-hidden'>WTW</h1>
          <Header authorizationStatus={authorizationStatus} />
          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{currentFilm?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{currentFilm?.genre}</span>
                <span className='film-card__year'>{currentFilm?.released}</span>
              </p>
              <div className='film-card__buttons'>
                <Link
                  className='btn btn--play film-card__button'
                  to={`/player/${currentFilm.id}`}
                >
                  <svg viewBox='0 0 19 19' width={19} height={19}>
                    <use xlinkHref='#play-s' />
                  </svg>
                  <span>Play</span>
                </Link>

                {authorizationStatus === AuthorizationStatus.Auth && (
                  <>
                    <Link
                      className='btn btn--list film-card__button'
                      to={AppRoute.MyList}
                    >
                      <svg viewBox='0 0 19 20' width={19} height={20}>
                        <use xlinkHref='#add' />
                      </svg>
                      <span>My list</span>
                      <span className='film-card__count'>9</span>
                    </Link>
                    <Link
                      to={`/films/${currentFilm?.id}/review`}
                      className='btn film-card__button'
                    >
                      Add review
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img
                src={currentFilm?.posterImage}
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
            {filmsLikeThis.map(({ id, posterImage, name }) => (
              <SmallFilmCard
                key={id}
                id={id}
                imgSrc={posterImage}
                name={name}
              />
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
