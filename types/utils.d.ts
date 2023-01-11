export type Replace<T extends object, K extends keyof T, P> = Omit<T, K> & {
  [key in K]: P;
};

export type RequiredKeys<T> = {
  [K in keyof T]-?: object extends { [P in K]: T[K] } ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends { [P in K]: T[K] } ? K : never;
}[keyof T];

/**
 * Namespaces the keys of the given type.
 *
 * `Example:`
 *
 * ```
 * T = {name: string, height: number}
 * NS = "person"
 * Namespaced<T, NS> = {person_name: string, person_height: number}
 * ```
 */
export type Namespaced<T extends object, NS extends string> = {
  [K in `${NS}_${Extract<RequiredKeys<T>, string>}`]: T[Exclude<keyof T, K>];
} & {
  [K in `${NS}_${Extract<OptionalKeys<T>, string>}`]?: T[Exclude<keyof T, K>];
};

type Primitive = string | number | symbol;

type GenericObject = Record<Primitive, unknown>;

type Join<
  L extends Primitive | undefined,
  R extends Primitive | undefined,
> = L extends string | number
  ? R extends string | number
    ? `${L}.${R}`
    : L
  : R extends string | number
  ? R
  : undefined;

type Union<
  L extends unknown | undefined,
  R extends unknown | undefined,
> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R;

/**
 * NestedPaths
 * Get all the possible paths of an object
 * @example
 * type Keys = NestedPaths<{ a: { b: { c: string } }>
 * // 'a' | 'a.b' | 'a.b.c'
 */
export type NestedPaths<
  T extends GenericObject,
  Prev extends Primitive | undefined = undefined,
  Path extends Primitive | undefined = undefined,
> = {
  [K in keyof T]: T[K] extends GenericObject
    ? NestedPaths<T[K], Union<Prev, Path>, Join<Path, K>>
    : Union<Union<Prev, Path>, Join<Path, K>>;
}[keyof T];
