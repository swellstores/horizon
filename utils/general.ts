export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] =>
  Object.keys(obj) as (keyof Obj)[];
