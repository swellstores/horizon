import { objectKeys } from './general';

export const validateRequiredFields = <
  Fields extends { [key: string]: string },
  ErrorPayloads extends { [key in keyof Fields]: unknown },
>(
  fields: Fields,
  errorPayloads: ErrorPayloads,
) => {
  const invalid = objectKeys(fields).find(
    (field) => fields[field].trim() === '',
  );

  return invalid ? errorPayloads[invalid] : null;
};
