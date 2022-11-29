// We have some requests that currently are not fully implemented in GraphQL API
// so we're using fetch to the REST storefront API in the meanwhile

const authorization = `Basic ${Buffer.from(
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY ?? '',
).toString('base64')}`;

const query =
  process.env.NEXT_PUBLIC_SWELL_EDITOR === 'true' ? '$preview=true' : '';

export const fetchStoreData = async (endpoint: string, locale = '') =>
  await fetch(
    `${process.env.NEXT_PUBLIC_SWELL_STORE_URL}${endpoint}?${encodeURI(query)}`,
    {
      headers: {
        authorization,
        'content-type': 'application/json',
        'x-locale': locale,
      },
    },
  ).then((res) => res.json());

export const fetchQuizData = (id: string, locale: string) =>
  fetchStoreData(`/api/content/quizzes/${id}/`, locale);

export const fetchPageData = (slug: string, locale: string) =>
  fetchStoreData(`/api/content/pages/${slug}/`, locale);
