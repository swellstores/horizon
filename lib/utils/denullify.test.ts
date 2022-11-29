import { denullifyArray } from './denullify';

describe('denullifyArray', () => {
  it('returns same array when no null or undefined values are present', () => {
    const array = [0, 1, 2, 3, 4, 5];

    expect(denullifyArray(array)).toStrictEqual([0, 1, 2, 3, 4, 5]);
  });

  it('returns an array without the null or undefined values', () => {
    const array = [0, 1, 2, undefined, 3, 4, null, '', null, 5];

    expect(denullifyArray(array)).toStrictEqual([0, 1, 2, 3, 4, '', 5]);
  });

  it('returns emptpy array when the argument passed to it is undefined', () => {
    const array = undefined;

    expect(denullifyArray(array)).toStrictEqual([]);
  });

  it('returns emptpy array when the argument passed to it is null', () => {
    const array = null;

    expect(denullifyArray(array)).toStrictEqual([]);
  });
});
