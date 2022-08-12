import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import MainLayout from '../../pages/main-layout/main-layout';
import Overview from '../overview/overview';
import Details from '../details/details';
import Reviews from '../reviews/reviews';
import SignIn from '../../pages/sign-in/sign-in';
import Player from '../../pages/player/player';
import PrivateRoot from '../private-route/private-route';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { AppRoute } from '../../project.constants';
import { useAppSelector } from '../../hooks/storeHooks';
import LoadingOverlay from '../loading-overlay/loading-overlay';

function App(): JSX.Element | null {
  const filmData = useAppSelector((state) => state.films.films);
  const isDataLoaded = useAppSelector((state) => state.films.isFilmDataLoaded);
  const isFetchError = useAppSelector((state) => state.films.filmDataError);
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  if (!isDataLoaded && !isFetchError) {
    return <LoadingOverlay />;
  }

  if (isFetchError) {
    <div>Sorry, server is not responding, please try again later.</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<WelcomeScreen authorizationStatus={authorizationStatus} />}
        />
        <Route
          path={AppRoute.Film}
          element={
            <MainLayout
              authorizationStatus={authorizationStatus}
              films={filmData}
            />
          }
        >
          <Route index element={<Overview />} />
          <Route path={AppRoute.Overview} element={<Overview />} />
          <Route path={AppRoute.Reviews} element={<Reviews />} />
          <Route path={AppRoute.Details} element={<Details />} />
          <Route path='*' element={<Overview />} />
        </Route>
        <Route path={AppRoute.Player} element={<Player films={filmData} />} />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn isSignInFailed={false} isError={false} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoot authorizationStatus={authorizationStatus}>
              <AddReview films={filmData} />
            </PrivateRoot>
          }
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoot authorizationStatus={authorizationStatus}>
              <MyList films={filmData} />
            </PrivateRoot>
          }
        />
        <Route path={AppRoute.PageNotFound} element={<PageNotFound />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
