// Mock for browser/node fetch that let's you return json data passed as an argument
export const mockFetchWithJson = (data: Record<string | number, unknown>) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    }),
  ) as jest.Mock;
};
