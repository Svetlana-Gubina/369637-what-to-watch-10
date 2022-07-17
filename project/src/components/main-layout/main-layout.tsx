import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import SmallFilmCard from '../small-film-card/small-film-card';
import type { Props } from './main-layout.types';
import { LIMIT, NAV_LIST } from './main-layout.constants';

function MainLayout({ films }: Props): JSX.Element {
  const [activeNavItem, setActiveNavItem] = useState(0);

  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img
              src='img/bg-the-grand-budapest-hotel.jpg'
              alt='The Grand Budapest Hotel'
            />
          </div>
          <h1 className='visually-hidden'>WTW</h1>
          <Header />
          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>The Grand Budapest Hotel</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>Drama</span>
                <span className='film-card__year'>2014</span>
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
                <Link to='/' className='btn film-card__button'>
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
                src='img/the-grand-budapest-hotel-poster.jpg'
                alt='The Grand Budapest Hotel poster'
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
                        to={`/films/:id/${navItem.toLocaleLowerCase()}`}
                        className='film-nav__link'
                      >
                        {navItem}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <Outlet />
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          <div className='catalog__films-list'>
            {films.slice(0, LIMIT).map(({ id, imgSrc, name, link }) => (
              <SmallFilmCard key={id} imgSrc={imgSrc} name={name} link={link} />
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
