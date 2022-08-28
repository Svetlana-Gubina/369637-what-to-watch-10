import { renderHook } from '@testing-library/react';
import useApiService from '../apiHooks/useApiService';
import { createApi } from '../../api';
import MockAdapter from 'axios-mock-adapter';

const api = createApi();
const mockApi = new MockAdapter(api);
const url = '/test';
const mockData = ['test', 'test'];
describe('useApiService tests', () => {
  it('should return response', async () => {
    type MockDataType = string[];
    mockApi.onGet(url).reply(200, mockData);
    const { result } = renderHook(() => useApiService<MockDataType>(url));

    expect(result.current.isError).toBeFalsy();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current).toBeInstanceOf(Object);
  });
});
