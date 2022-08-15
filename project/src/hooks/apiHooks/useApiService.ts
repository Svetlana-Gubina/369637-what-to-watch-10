import { useState, useEffect } from 'react';
import { api } from '../../store';

type ReturnType<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
};

function useApiService<T>(url: string, update?: boolean): ReturnType<T> {
  const [data, setData] = useState<T | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    api
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [url, update]);

  return {
    data,
    isLoading: !isError && !data,
    isError,
  };
}

export default useApiService;
