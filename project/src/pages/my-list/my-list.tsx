import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import type { Props } from '../../components/app/app.types';
import { MY_LIST_COUNT } from './my-list.constants';

function MyList({ films }: Props): JSX.Element {
  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo />
        <h1 className='page-title user-page__title'>
          My list <span className='user-page__film-count'>{MY_LIST_COUNT}</span>
        </h1>
        <ul className='user-block'>
          <li className='user-block__item'>
            <div className='user-block__avatar'>
              <img
                src='img/avatar.jpg'
                alt='User avatar'
                width={63}
                height={63}
              />
            </div>
          </li>
          <li className='user-block__item'>
            <Link to='/' className='user-block__link'>
              Sign out
            </Link>
          </li>
        </ul>
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
