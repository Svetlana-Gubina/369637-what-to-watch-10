import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute } from '../../project.constants';
import useUrlParam from '../../hooks/useUrlParam/useUrlParam';
import { RATING_ITEMS } from './add-review.constants';
import type { Props } from '../app/app.types';

function AddReview({ films }: Props): JSX.Element {
  const currentFilm = useUrlParam(films);
  const [review, setReview] = useState({
    text: '',
    rating: 0,
  });

  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setReview({
      ...review,
      text: value,
    });
  };

  const handleRateChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;

    setReview({
      ...review,
      rating: Number(value),
    });
  };

  if (!currentFilm) {
    return <Navigate to={AppRoute.PageNotFound} />;
  }

  return (
    <section className='film-card film-card--full'>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={currentFilm?.imgSrc} alt={currentFilm?.name} />
        </div>
        <h1 className='visually-hidden'>WTW</h1>
        <header className='page-header'>
          <Logo />

          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <Link
                  to={`/films/${currentFilm?.id}`}
                  className='breadcrumbs__link'
                >
                  {currentFilm?.name}
                </Link>
              </li>
              <li className='breadcrumbs__item'>
                <Link to='#' className='breadcrumbs__link'>
                  Add review
                </Link>
              </li>
            </ul>
          </nav>

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
        <div className='film-card__poster film-card__poster--small'>
          <img
            src={currentFilm?.imgSrc}
            alt={currentFilm?.name}
            width={218}
            height={327}
          />
        </div>
      </div>
      <div className='add-review'>
        <form action='#' className='add-review__form'>
          <div className='rating'>
            <div className='rating__stars'>
              {RATING_ITEMS.map((item, i) => (
                <>
                  <input
                    key={item}
                    className='rating__input'
                    id={`star-${i}`}
                    type='radio'
                    name='rating'
                    defaultValue={i + 1}
                    defaultChecked={false}
                    onChange={(evt) => handleRateChange(evt)}
                  />
                  <label className='rating__label' htmlFor={`star-${i}`}>
                    {`Rating ${i}`}
                  </label>
                </>
              ))}
            </div>
          </div>
          <div className='add-review__text'>
            <textarea
              className='add-review__textarea'
              name='review-text'
              id='review-text'
              placeholder='Review text'
              defaultValue={''}
              onChange={(evt) => handleTextChange(evt)}
            />
            <div className='add-review__submit'>
              <button className='add-review__btn' type='submit'>
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddReview;
