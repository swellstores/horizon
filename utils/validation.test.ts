import { validateNonEmptyFields } from './validation';

describe('validateNonEmptyFields', () => {
  const fields = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  const errorPayloads = {
    firstName: 'First name is required',
    lastName: 'Last name is required',
    email: 'Email is required',
  };

  it('should return null if all fields are not empty', () => {
    expect(validateNonEmptyFields(fields, errorPayloads)).toBe(null);
  });

  it('should return the error payload for the first empty field', () => {
    fields.firstName = '';
    expect(validateNonEmptyFields(fields, errorPayloads)).toEqual(
      errorPayloads.firstName,
    );

    fields.firstName = 'John';
    fields.email = '';
    expect(validateNonEmptyFields(fields, errorPayloads)).toEqual(
      errorPayloads.email,
    );
  });

  it('should return the error payload for an empty field that contains only whitespace', () => {
    fields.firstName = '   ';
    expect(validateNonEmptyFields(fields, errorPayloads)).toEqual(
      errorPayloads.firstName,
    );
  });

  it('should return the error payload for the first empty field when some fields are empty and some are not empty', () => {
    fields.firstName = '';
    fields.lastName = '';
    expect(validateNonEmptyFields(fields, errorPayloads)).toEqual(
      errorPayloads.firstName,
    );
  });
});
