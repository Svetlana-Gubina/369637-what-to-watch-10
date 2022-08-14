import React, { useState, FormEvent, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../project.constants';
import useUrlParam from '../../hooks/useUrlParam/useUrlParam';
import UserBlock from '../../components/user-block/user-block';
import { RATING_ITEMS } from './add-review.constants';
import { addComment } from '../../store/async-action';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { clearCommentState } from '../../store/action';
import type { Props } from '../../components/app/app.types';

function AddReview({ films }: Props): JSX.Element {
  const currentFilm = useUrlParam(films);
  const isSuccess = useAppSelector((state) => state.comment.isCommentSuccess);
  const isError = useAppSelector((state) => state.comment.isCommentError);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

  const validate = (): boolean => {
    if (!rating) {
      // todo: show error
      // console.log('Please check some stars');
      return false;
    }

    return true;
  };

  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;

    setText(value);
  };

  const handleRateChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;

    setRating(Number(value));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validate()) {
      return;
    }

    if (text && rating && currentFilm) {
      dispatch(
        addComment({
          filmId: currentFilm.id,
          data: { comment: text, rating: rating },
        })
      );
    }
  };

  if (!currentFilm) {
    return <Navigate to={AppRoute.PageNotFound} />;
  }

  if (isSuccess) {
    if (textRef.current && inputRefs.current) {
      textRef.current.value = '';
      inputRefs.current.map((el) => {
        el.checked = false;
        el.className = 'rating__input';
        return el;
      });
    }

    setText('');
    setRating(0);
    window.location.reload();
    // todo: show error
    // console.log('Your review successfully posted!');
    dispatch(clearCommentState());
  }

  if (isError) {
    // todo: show error
    // console.log('Sorry, comment not posted, please try again.');
    dispatch(clearCommentState());
  }

  return (
    <section className='film-card film-card--full'>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
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

          <UserBlock />
        </header>
        <div className='film-card__poster film-card__poster--small'>
          <img
            src={currentFilm?.posterImage}
            alt={currentFilm?.name}
            width={218}
            height={327}
          />
        </div>
      </div>
      <div className='add-review'>
        <form
          action='#'
          className='add-review__form'
          onSubmit={(evt) => handleSubmit(evt)}
        >
          <div className='rating'>
            <div className='rating__stars'>
              {RATING_ITEMS.map((item, i) => (
                <div key={item}>
                  <input
                    ref={(el: HTMLInputElement) => (inputRefs.current[i] = el)}
                    className={`rating__input ${
                      i <= rating - 1 ? 'active' : ''
                    }`}
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
                </div>
              ))}
            </div>
          </div>
          <div className='add-review__text'>
            <textarea
              ref={textRef}
              className='add-review__textarea'
              name='review-text'
              id='review-text'
              placeholder='Review text'
              maxLength={400}
              minLength={50}
              required
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
