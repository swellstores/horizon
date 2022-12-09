import { objectKeys } from './helpers';

/**
 * Validates that the given fields are not empty. Returns an error payload if any of the
 * fields are empty, or `null` if all fields are non-empty.
 *
 * @template Fields - A type that maps field names to field values.
 * @template ErrorPayloads - A type that maps field names to error payloads.
 * @param {Fields} fields - The fields to validate.
 * @param {ErrorPayloads} errorPayloads - The error payloads to use for fields that are empty.
 * @returns {ErrorPayloads[keyof Fields] | null} The error payload for the first empty field, or
 * `null` if all fields are non-empty.
 */
export const validateNonEmptyFields = <
  Fields extends { [key: string]: string },
  ErrorPayloads extends { [key in keyof Fields]: unknown },
>(
  fields: Fields,
  errorPayloads: ErrorPayloads,
): ErrorPayloads[keyof Fields] | null => {
  const invalid = objectKeys(fields).find(
    (field) => fields[field].trim() === '',
  );

  return invalid ? errorPayloads[invalid] : null;
};
