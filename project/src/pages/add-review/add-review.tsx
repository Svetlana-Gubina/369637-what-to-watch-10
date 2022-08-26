import React, { useState, FormEvent, useRef } from 'react';
import Header from '../../components/header-section/header-section';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../project.constants';
import useUrlParam from '../../hooks/useUrlParam/useUrlParam';
import {
  RATING_ITEMS,
  MAX_REVIEW_LENGTH,
  MIN_REVIEW_LENGTH,
} from './add-review.constants';
import { addComment } from '../../store/async-action';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { clearCommentState } from '../../store/action';
import LoadingOverlay from '../../components/loading-overlay/loading-overlay';
import type { Props } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddReview({ films, authorizationStatus }: Props): JSX.Element {
  const currentFilm = useUrlParam(films);
  const isSuccess = useAppSelector((state) => state.comment.isCommentSuccess);
  const isError = useAppSelector((state) => state.comment.isCommentError);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

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

    if (text && rating && currentFilm) {
      dispatch(
        addComment({
          filmId: currentFilm.id,
          data: { comment: text, rating: rating },
        })
      );
      setIsLoading(true);
    }
  };

  if (!currentFilm) {
    navigate(AppRoute.PageNotFound);
  }

  if (isSuccess) {
    setIsLoading(false);
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
    dispatch(clearCommentState());
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (isError) {
    setIsLoading(false);
    toast.error(
      'Sorry, some error happened, comment is not posted. Please, try again.'
    );
    dispatch(clearCommentState());
  }

  return (
    <section className='film-card film-card--full'>
      <ToastContainer />
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
        </div>
        <h1 className='visually-hidden'>WTW</h1>
        <Header authorizationStatus={authorizationStatus}>
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
        </Header>

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
            {!rating && (
              <p className='rating_message'>Please check some stars</p>
            )}
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
          {text.length < MIN_REVIEW_LENGTH && (
            <p className='review-text_message'>
              Please type at least {MIN_REVIEW_LENGTH} characters
            </p>
          )}
          <div className='add-review__text'>
            <textarea
              data-testid='test-textarea'
              ref={textRef}
              className='add-review__textarea'
              name='review-text'
              id='review-text'
              placeholder='Review text'
              maxLength={MAX_REVIEW_LENGTH}
              minLength={MIN_REVIEW_LENGTH}
              required
              defaultValue={''}
              onChange={(evt) => handleTextChange(evt)}
            />
            <div className='add-review__submit'>
              <button
                data-testid='test-submit'
                className='add-review__btn'
                type='submit'
                disabled={text.length < MIN_REVIEW_LENGTH || !rating}
              >
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
