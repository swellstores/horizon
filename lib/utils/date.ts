export const formatDateToMonthYear = (date: Date, locale?: string): string => {
  const dateObject = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) return '';

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
  })
    .formatToParts(new Date(date))
    .filter((part) => part?.type === 'month' || part?.type === 'year')
    .map((part) => part.value)
    .join(', ');
};

export const formatDateToLocale = (date: Date, locale?: string): string => {
  const dateObject = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) return '';

  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
