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
