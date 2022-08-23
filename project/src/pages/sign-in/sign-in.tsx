import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { loginAction } from '../../store/async-action';
import { AppRoute } from '../../project.constants';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';

function SignIn(): JSX.Element {
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const isLoginError = useAppSelector((state) => state.user.isLoginError);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (email: string) => /[0-9]+[A-Za-z]+/g.test(email);

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(evt.target.value);
    setIsEmailError(false);
  };

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(evt.target.value);
    setIsPasswordError(false);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValidEmail(userEmail)) {
      setIsEmailError(true);
      return;
    }
    if (!isValidPassword) {
      setIsPasswordError(true);
      return;
    }

    if (userEmail && userPassword) {
      dispatch(loginAction({ email: userEmail, password: userPassword }));
    }
  };

  return (
    <div className='user-page'>
      <Header
        authorizationStatus={authorizationStatus}
        additionalClassName={'user-page__head'}
        isSignInPage
      >
        <h1 className='page-title user-page__title'>Sign in</h1>
      </Header>

      <div className='sign-in user-page__content'>
        <form
          action='#'
          className='sign-in__form'
          onSubmit={(evt) => handleSubmit(evt)}
        >
          {isEmailError && (
            <div className='sign-in__message'>
              <p>Please enter a valid email address</p>
            </div>
          )}
          {isPasswordError && (
            <div className='sign-in__message'>
              <p>Password should contain digits and letters</p>
            </div>
          )}
          {isLoginError && (
            <div className='sign-in__message'>
              <p>
                We can’t recognize this email <br /> and password combination.
                Please try again.
              </p>
            </div>
          )}
          <div className='sign-in__fields'>
            <div
              className={`sign-in__field ${
                isEmailError && 'sign-in__field--error'
              }`}
            >
              <input
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                onChange={(evt) => handleEmailChange(evt)}
                required
                data-testid='test-email'
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-email'
              >
                Email address
              </label>
            </div>
            <div
              className={`sign-in__field ${
                isPasswordError && 'sign-in__field--error'
              }`}
            >
              <input
                className='sign-in__input'
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                onChange={(evt) => handlePasswordChange(evt)}
                data-testid='test-password'
                required
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-password'
              >
                Password
              </label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button
              className='sign-in__btn'
              type='submit'
              data-testid='test-signInSubmit'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
