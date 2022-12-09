import { useRef } from 'react';

interface FetchConfig {
  url: string;
  options?: RequestInit;
}

const useFetchApi = () => {
  const fetching = useRef(false);

  const fetchApi = async (
    config: FetchConfig,
    responseCallback?: (res: Response) => void | Promise<void> | boolean,
    errorCallback?: () => void | boolean,
    validationCallback?: () => void | boolean,
    completeCallback?: () => void,
  ) => {
    if (fetching.current) return;
    if (validationCallback) {
      const valid = validationCallback();
      if (valid === false) return;
    }
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
        const validResponse = responseCallback(res);
        if (validResponse === false) return;
      }
    } catch (error) {
      fetching.current = false;
      if (errorCallback) {
        errorCallback();
        return;
      }
    }

    if (completeCallback) completeCallback();
  };

  return fetchApi;
};

export default useFetchApi;
