import React from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import type { Props } from '../../components/app/app.types';
import UserBlock from '../../components/user-block/user-block';
import { MY_LIST_COUNT } from './my-list.constants';

function MyList({ films }: Props): JSX.Element {
  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo />
        <h1 className='page-title user-page__title'>
          My list <span className='user-page__film-count'>{MY_LIST_COUNT}</span>
        </h1>
        <UserBlock />
      </header>
      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <div className='catalog__films-list'>
          {films.slice(MY_LIST_COUNT).map(({ id, posterImage, name }) => (
            <SmallFilmCard key={id} id={id} imgSrc={posterImage} name={name} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyList;
