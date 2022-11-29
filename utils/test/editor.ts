// This injects (then removes) NEXT_PUBLIC_SWELL_EDITOR = 'true'
// * To be used in tests that make use of NEXT_PUBLIC_SWELL_EDITOR
export const enableEditor = () => {
  const oldEnvVars = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnvVars };
    process.env.NEXT_PUBLIC_SWELL_EDITOR = 'true';
  });

  afterAll(() => {
    process.env = oldEnvVars;
  });
};
