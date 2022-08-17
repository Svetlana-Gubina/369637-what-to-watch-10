import React, { useState, useEffect } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { AppRoute } from '../../project.constants';
import type { Props } from './main-layout.types';
import { NAV_LIST, LIMIT } from './main-layout.constants';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import { useParams } from 'react-router-dom';
import type { FilmItemType } from '../../types';
import useApiService from '../../hooks/apiHooks/useApiService';
import { ApiRoute } from '../../api/constants';
import LoadingOverlay from '../../components/loading-overlay/loading-overlay';
import { handleFilmStateUpdate } from '../../project.utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({
  authorizationStatus,
}: Omit<Props, 'films'>): JSX.Element {
  const { id: searchId } = useParams();
  const [filmStatus, setFilmStatus] = useState(false);
  const {
    data: currentFilmData,
    isLoading: isFilmDataLoading,
    isError: isFilmDataError,
  } = useApiService<FilmItemType>(`${ApiRoute.Films}/${searchId}`, filmStatus);
  const { data: similarFilms, isLoading } = useApiService<FilmItemType[]>(
    `${ApiRoute.Films}/${searchId}/similar`
  );
  const location = useLocation();
  const currentNavItem = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1
  );
  const reg = new RegExp(currentNavItem, 'i');
  const subPageCurrentIndex = NAV_LIST.findIndex((n) => n.match(reg));
  const [activeNavItem, setActiveNavItem] = useState(
    subPageCurrentIndex > 0 ? subPageCurrentIndex : 0
  );

  useEffect(() => {
    if (currentFilmData) {
      setFilmStatus(currentFilmData.isFavorite);
    }
  }, [currentFilmData]);

  useEffect(() => {
    if (subPageCurrentIndex > 0) {
      setActiveNavItem(subPageCurrentIndex);
    } else {
      setActiveNavItem(0);
    }
  }, [currentNavItem, subPageCurrentIndex]);

  const [isFilmStatusUpdateError, setIsFilmStatusUpdateError] = useState(false);
  const { data: myFilms } = useApiService<FilmItemType[]>(
    ApiRoute.Favorite,
    filmStatus
  );

  if (isFilmDataError) {
    return <Navigate to={AppRoute.PageNotFound} />;
  }

  if (isFilmDataLoading) {
    return <LoadingOverlay />;
  }

  if (isFilmStatusUpdateError) {
    toast.error(
      'Sorry, some error, film status in not changed. Please, try again'
    );
  }

  return (
    <>
      <section className='film-card film-card--full'>
        <ToastContainer />
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img
              src={currentFilmData?.backgroundImage}
              alt={currentFilmData?.name}
            />
          </div>
          <h1 className='visually-hidden'>WTW</h1>
          <Header authorizationStatus={authorizationStatus} />
          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{currentFilmData?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>
                  {currentFilmData?.genre}
                </span>
                <span className='film-card__year'>
                  {currentFilmData?.released}
                </span>
              </p>
              <div className='film-card__buttons'>
                <Link
                  className='btn btn--play film-card__button'
                  to={`/player/${currentFilmData?.id}`}
                >
                  <svg viewBox='0 0 19 19' width={19} height={19}>
                    <use xlinkHref='#play-s' />
                  </svg>
                  <span>Play</span>
                </Link>

                {authorizationStatus === AuthorizationStatus.Auth && (
                  <>
                    <button
                      onClick={
                        (evt) =>
                          handleFilmStateUpdate(
                            evt,
                            currentFilmData?.id,
                            filmStatus,
                            setFilmStatus,
                            setIsFilmStatusUpdateError
                          )
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                      className='btn btn--list film-card__button'
                    >
                      <svg viewBox='0 0 19 20' width={19} height={20}>
                        <use xlinkHref={filmStatus ? '#in-list' : '#add'} />
                      </svg>
                      <span>My list</span>
                      <span className='film-card__count'>
                        {myFilms?.length || 0}
                      </span>
                    </button>
                    <Link
                      to={`/films/${currentFilmData?.id}/review`}
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
                src={currentFilmData?.posterImage}
                alt={currentFilmData?.name}
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
                          currentFilmData?.id
                        }/${navItem.toLocaleLowerCase()}`}
                        className='film-nav__link'
                      >
                        {navItem}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <Outlet context={currentFilmData} />
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>
          {!isLoading && (
            <div className='catalog__films-list'>
              {similarFilms
                ?.filter(({ id }) => id !== currentFilmData?.id)
                .slice(0, LIMIT)
                .map(
                  ({ id, posterImage, name, previewVideoLink, videoLink }) => (
                    <SmallFilmCard
                      key={id}
                      id={id}
                      imgSrc={posterImage}
                      name={name}
                      previewVideoLink={previewVideoLink}
                      videoLink={videoLink}
                    />
                  )
                )}
            </div>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
