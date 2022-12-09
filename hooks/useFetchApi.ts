import { useRef } from 'react';

interface FetchConfig {
  url: string;
  options?: RequestInit;
}

const useFetchApi = () => {
  const fetching = useRef(false);

  /**
   * Makes a `fetch` request using the provided `FetchConfig` object and calls optional callback functions
   * based on the success or failure of the `fetch` request.
   *
   * @param {Object} config - The `FetchConfig` object that contains the `url` and `options` for the `fetch`
   * request.
   * @param {Function} [responseCallback] - An optional callback function that is called with the `Response`
   * object when the `fetch` request is successful. If the function returns `false`, the `fetchApi` function
   * returns immediately.
   * @param {Function} [errorCallback] - An optional callback function that is called when the `fetch` request
   * fails. If the function returns `false`, the `fetchApi` function returns immediately.
   * @param {Function} [validationCallback] - An optional callback function that is called before making the
   * `fetch` request. If the function returns `false`, the `fetchApi` function returns immediately without
   * making the `fetch` request.
   * @param {Function} [completeCallback] - An optional callback function that is called after the `fetch`
   * request has completed, regardless of whether the `fetch` request was successful or not.
   *
   * @returns {void}
   *
   * @example
   * const handleResponse = (res) => {
   *   console.log(res);
   * };
   *
   * const onError = () => {
   *   console.error('An error occurred!');
   * };
   *
   * fetchApi({
   *   url: 'https://my-api.com/users',
   *   options: {
   *     method: 'GET',
   *   },
   * }, handleResponse, onError);
   */
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
