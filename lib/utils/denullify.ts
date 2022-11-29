export type NotNullish<T> = T extends null
  ? never
  : T extends undefined
  ? never
  : T;

export type NotNullishObject<T> = Omit<
  Required<{
    [P in keyof T]: NotNullish<T[P]>;
  }>,
  '__typename'
>;

export function isNotNull<T>(argument: T | null): argument is T {
  return argument !== null;
}

/**
 * Filters out null values from an array
 */
export function denullifyArray<T>(array: T[] | undefined | null) {
  return (
    (array?.filter(
      (item) => item !== null && item !== undefined,
    ) as NotNullish<T>[]) ?? []
  );
}
