import type { NextRouter } from 'next/router';
import { useState } from 'react';
import type { Url } from 'url';

export const useMockRouter = (): NextRouter => {
  const [asPath, setAsPath] = useState('/');

  const push = async (url: Url | string, as: Url | string) => {
    if (as && typeof as === 'string') {
      setAsPath(as);
    } else if (url && typeof url === 'string') {
      setAsPath(url);
    }

    return true;
  };

  return {
    asPath,
    push,
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: false,
    isPreview: false,
  };
};
