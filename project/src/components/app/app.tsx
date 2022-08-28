import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import MainLayout from '../../pages/main-layout/main-layout';
import Overview from '../overview-section/overview-section';
import Details from '../details-section/details-section';
import Reviews from '../reviews-section/reviews-section';
import SignIn from '../../pages/sign-in/sign-in';
import Player from '../../pages/player/player';
import PrivateRoot from '../private-route/private-route';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { AppRoute } from '../../project.constants';
import LoadingOverlay from '../loading-overlay/loading-overlay';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { fetchAllFilms, fetchPromo } from '../../store/async-action';
import { AuthorizationStatus } from '../../components/private-route/private-route.constants';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element | null {
  const filmData = useAppSelector((state) => state.films.films);
  const isDataLoaded = useAppSelector((state) => state.films.isFilmDataLoaded);
  const isFetchError = useAppSelector((state) => state.films.filmDataError);
  const authorizationStatus =
    useAppSelector((state) => state.user.authorizationStatus) ||
    AuthorizationStatus.Unknown;

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchAllFilms());
      dispatch(fetchPromo());
    }
  }, [isDataLoaded, dispatch]);

  if (!isDataLoaded && !isFetchError) {
    return <LoadingOverlay />;
  }

  if (isFetchError) {
    return <div>Sorry, server is not responding, please try again later.</div>;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<WelcomeScreen authorizationStatus={authorizationStatus} />}
        />
        <Route
          path={AppRoute.Film}
          element={<MainLayout authorizationStatus={authorizationStatus} />}
        >
          <Route index element={<Overview />} />
          <Route path={AppRoute.Overview} element={<Overview />} />
          <Route path={AppRoute.Reviews} element={<Reviews />} />
          <Route path={AppRoute.Details} element={<Details />} />
          <Route path='*' element={<Overview />} />
        </Route>
        <Route path={AppRoute.Player} element={<Player films={filmData} />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoot authorizationStatus={authorizationStatus}>
              <AddReview
                authorizationStatus={authorizationStatus}
                films={filmData}
              />
            </PrivateRoot>
          }
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoot authorizationStatus={authorizationStatus}>
              <MyList authorizationStatus={authorizationStatus} />
            </PrivateRoot>
          }
        />
        <Route path={AppRoute.PageNotFound} element={<PageNotFound />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
