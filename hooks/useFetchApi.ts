import { useRef } from 'react';

interface FetchConfig {
  url: string;
  options?: RequestInit;
}

const useFetchApi = () => {
  const fetching = useRef(false);

  const fetchApi = async (
    config: FetchConfig,
    responseCallback?: (res: Response) => void,
    errorCallback?: () => void,
  ) => {
    if (fetching.current) return;
    try {
      fetching.current = true;

      const res = await fetch(config.url, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...config.options,
      });

      fetching.current = false;

      if (responseCallback) {
        responseCallback(res);
      }
    } catch (error) {
      fetching.current = false;
      if (errorCallback) {
        errorCallback();
      }
    }
  };

  return fetchApi;
};

export default useFetchApi;
