/**
 * Access a property of an object by string path.
 *
 * Example:
 * ```ts
 * const obj = {
 *  a: { b: { c: 'hello' } }
 * }
 * const result = getProperty(obj, 'a.b.c');
 * // result = 'hello'
 * ```
 */
export const getProperty = (obj: object, path: string) =>
  path.split('.').reduce<unknown>((prev, current) => {
    if (!prev || typeof prev !== 'object' || Object.keys(obj).length === 0)
      return undefined;

    return prev[current as keyof typeof prev];
  }, obj ?? {});

/**
 * Set a property inside an object using a string path.
 *
 * Example:
 * ```ts
 * const obj = {}
 * setProperty(obj, 'a.b.c.0', 'hello');
 * // obj = { a: { b: { c: [ 'hello' ] } } }
 * ```
 */
export const setProperty = (obj: object, path: string, value: unknown) => {
  // Split the path into an array of keys
  const keys = path.split('.');

  // Get the last key in the path
  const last = keys[keys.length - 1] as keyof object;

  // Iterate over the keys and create the missing nested properties, skipping the last key
  const parent = keys.slice(0, -1).reduce<unknown>((acc, current, index) => {
    // Access the current property's value
    const value = (acc as Record<string, unknown> | undefined)?.[current];

    const doesValueExist = !!value && typeof value === 'object';

    if (doesValueExist) return value;

    const nextKey = keys[index + 1];

    // Check if the next key is a number
    const isArray = !isNaN(Number(nextKey));

    // Create the new property
    const newValue = isArray ? [] : {};

    // Set the property
    (acc as Record<string, unknown>)[current] = newValue;

    return newValue;
  }, obj) as object;

  // Set the last property of the path to the value
  parent[last] = value as object[keyof object];

  // Return the root object
  return obj as Record<string, unknown>;
};

export function generateId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
}
