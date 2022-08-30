import React from 'react';
import HeaderSection from '../../components/header-section/header-section';
import FooterSection from '../../components/footer-section/footer-section';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import useApiService from '../../hooks/apiHooks/useApiService';
import { ApiRoute } from '../../api/constants';
import type { FilmItemType } from '../../types';
import type { Props } from '../../types';
import LoadingOverlay from '../../components/loading-overlay/loading-overlay';

function MyList({ authorizationStatus }: Omit<Props, 'films'>): JSX.Element {
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
      <HeaderSection
        authorizationStatus={authorizationStatus}
        additionalClassName={'user-page__head'}
      >
        <h1 className='page-title user-page__title'>
          My list{' '}
          <span className='user-page__film-count'>{myFilms?.length}</span>
        </h1>
      </HeaderSection>

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
      <FooterSection />
    </div>
  );
}

export default MyList;
