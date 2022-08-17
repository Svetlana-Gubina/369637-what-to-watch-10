import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { loginAction } from '../../store/async-action';
import { AppRoute } from '../../project.constants';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';

function SignIn(): JSX.Element {
  const [isEmailError, setIsEmailError] = useState(false);
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

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(evt.target.value);
    setIsEmailError(false);
  };

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValidEmail(userEmail)) {
      setIsEmailError(true);
      return;
    }

    if (userEmail && userPassword) {
      dispatch(loginAction({ email: userEmail, password: userPassword }));
    }
  };

  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo />
        <h1 className='page-title user-page__title'>Sign in</h1>
      </header>
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
          {isLoginError && (
            <div className='sign-in__message'>
              <p>
                We can’t recognize this email <br /> and password combination.
                Please try again.
              </p>
            </div>
          )}
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                onChange={(evt) => handleEmailChange(evt)}
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-email'
              >
                Email address
              </label>
            </div>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                onChange={(evt) => handlePasswordChange(evt)}
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
            <button className='sign-in__btn' type='submit'>
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
