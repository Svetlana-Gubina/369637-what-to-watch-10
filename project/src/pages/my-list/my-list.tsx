import React from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import UserBlock from '../../components/user-block/user-block';
import useApiService from '../../hooks/apiHooks/useApiService';
import { ApiRoute } from '../../api/constants';
import type { FilmItemType } from '../../types';
import LoadingOverlay from '../../components/loading-overlay/loading-overlay';

function MyList(): JSX.Element {
  const {
    data: myFilms,
    isLoading,
    isError,
  } = useApiService<FilmItemType[]>(ApiRoute.Favorite);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (isError) {
    return <div>Sorry, some error, try again later.</div>;
  }

  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo />
        <h1 className='page-title user-page__title'>
          My list{' '}
          <span className='user-page__film-count'>{myFilms?.length}</span>
        </h1>
        <UserBlock />
      </header>
      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <div className='catalog__films-list'>
          {myFilms?.map(
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
      </section>
      <Footer />
    </div>
  );
}

export default MyList;
