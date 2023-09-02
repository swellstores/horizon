/**
 * Returns an array of the keys of the given object. This is a TypeScript implementation of
 * the built-in `Object.keys` function.
 *
 * @template Obj - The type of the object.
 * @param {Obj} obj - The object to get the keys of.
 * @returns {(keyof Obj)[]} An array of the keys of the given object.
 */
export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] =>
  Object.keys(obj as object) as (keyof Obj)[];
