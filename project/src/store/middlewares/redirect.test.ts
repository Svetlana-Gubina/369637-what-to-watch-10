import { configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../project.constants';

const historyMock = {
  location: { pathname: '' },
  push: function (path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => historyMock);

const middlewares = [redirect];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Middleware tests', () => {
  beforeEach(() => {
    historyMock.push('');
  });

  it('should redirect to login page', () => {
    store.dispatch(redirectToRoute(AppRoute.SignIn));
    expect(historyMock.location.pathname).toBe(AppRoute.SignIn);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.SignIn)]);
  });

  it('should not to redirect, if action type mismatch', () => {
    store.dispatch({ type: 'unknown action', payload: '/test' });
    expect(historyMock.location.pathname).not.toBe('/test');
  });
});
