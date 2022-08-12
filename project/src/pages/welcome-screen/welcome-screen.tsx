import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import Catalog from '../../components/catalog/catalog';
import { useAppSelector } from '../../hooks/storeHooks';
import type { Props } from '../../components/app/app.types';

function WelcomeScreen({
  authorizationStatus,
}: Omit<Props, 'films'>): JSX.Element {
  const promo = useAppSelector((state) => state.films.promo);

  return (
    <>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={promo?.backgroundImage} alt={promo?.name} />
        </div>
        <h1 className='visually-hidden'>WTW</h1>
        <Header authorizationStatus={authorizationStatus} />
        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img
                src={promo?.posterImage}
                alt={`${promo?.name} poster`}
                width={218}
                height={327}
              />
            </div>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{promo?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{promo?.genre}</span>
                <span className='film-card__year'>{promo?.released}</span>
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
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

export default WelcomeScreen;
