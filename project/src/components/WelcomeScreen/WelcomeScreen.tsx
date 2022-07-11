/* eslint-disable quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SmallFilmCard from "../SmallFilmCard/SmallFilmCard";

function WelcomeScreen(): JSX.Element {
  const films = [
    {
      id: 1,
      imgSrc: "img/fantastic-beasts-the-crimes-of-grindelwald.jpg",
      name: "Fantastic Beasts: The Crimes of Grindelwald",
      link: "film-page.html",
    },
    {
      id: 2,
      imgSrc: "img/bohemian-rhapsody.jpg",
      name: "Bohemian Rhapsody",
      link: "film-page.html",
    },
    {
      id: 3,
      imgSrc: "img/macbeth.jpg",
      name: "Macbeth",
      link: "film-page.html",
    },
    {
      id: 4,
      imgSrc: "img/aviator.jpg",
      name: "Aviator",
      link: "film-page.html",
    },
    {
      id: 5,
      imgSrc: "img/we-need-to-talk-about-kevin.jpg",
      name: "We need to talk about Kevin",
      link: "film-page.html",
    },
    {
      id: 6,
      imgSrc: "img/what-we-do-in-the-shadows.jpg",
      name: "What We Do in the Shadows",
      link: "film-page.html",
    },
    {
      id: 7,
      imgSrc: "img/revenant.jpg",
      name: "Revenant",
      link: "film-page.html",
    },
    {
      id: 8,
      imgSrc: "img/johnny-english.jpg",
      name: "Johnny English",
      link: "film-page.html",
    },
    {
      id: 9,
      imgSrc: "img/shutter-island.jpg",
      name: "Shutter Island",
      link: "film-page.html",
    },
    {
      id: 10,
      imgSrc: "img/pulp-fiction.jpg",
      name: "Pulp Fiction",
      link: "film-page.html",
    },
    {
      id: 11,
      imgSrc: "img/no-country-for-old-men.jpg",
      name: "No Country for Old Men",
      link: "film-page.html",
    },
    {
      id: 12,
      imgSrc: "img/snatch.jpg",
      name: "Snatch",
      link: "film-page.html",
    },
    {
      id: 13,
      imgSrc: "img/moonrise-kingdom.jpg",
      name: "Moonrise Kingdom",
      link: "film-page.html",
    },
    {
      id: 14,
      imgSrc: "img/seven-years-in-tibet.jpg",
      name: "Seven Years in Tibet",
      link: "film-page.html",
    },
    {
      id: 15,
      imgSrc: "img/midnight-special.jpg",
      name: "Midnight Special",
      link: "film-page.html",
    },
    {
      id: 16,
      imgSrc: "img/war-of-the-worlds.jpg",
      name: "War of the Worlds",
      link: "film-page.html",
    },
    {
      id: 17,
      imgSrc: "img/dardjeeling-limited.jpg",
      name: "Dardjeeling Limited",
      link: "film-page.html",
    },
    {
      id: 18,
      imgSrc: "img/orlando.jpg",
      name: "Orlando",
      link: "film-page.html",
    },
    {
      id: 19,
      imgSrc: "img/mindhunter.jpg",
      name: "Mindhunter",
      link: "film-page.html",
    },
    {
      id: 20,
      imgSrc: "img/midnight-special.jpg",
      name: "Midnight Special",
      link: "film-page.html",
    },
  ];
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link" href="#">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width={63}
                  height={63}
                />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>
              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">
                All genres
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Comedies
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Crime
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Documentary
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Dramas
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Horror
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Kids &amp; Family
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Romance
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Sci-Fi
              </a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">
                Thrillers
              </a>
            </li>
          </ul>
          <div className="catalog__films-list">
            {films.map(({ id, imgSrc, name, link }) => (
              <SmallFilmCard key={id} imgSrc={imgSrc} name={name} link={link} />
            ))}
          </div>
          <div className="catalog__more">
            <button className="catalog__button" type="button">
              Show more
            </button>
          </div>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default WelcomeScreen;
