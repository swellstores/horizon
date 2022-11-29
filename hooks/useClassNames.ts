import { useMemo } from 'react';

type Argument = string | Record<string, boolean> | undefined;

/**
 * Toggle classNames conditionally
 * @example
 * Here's a simple example:
 *
 * `Example input:`
 * ```
 * const classNames = useClassNames('bg-red', { 'text-5xl': myBoolean })
 * ```
 * `Example output:`
 *
 *  classNames when myBoolean is true:
 * ```
 * 'bg-red text-5xl'
 * ```
 *
 *  classNames when myBoolean is false:
 * ```
 * 'bg-red'
 * ```
 * */
const useClassNames = (...args: Argument[]) => {
  return useMemo(() => {
    const classNames = new Set<string>();

    for (const argument of args) {
      switch (typeof argument) {
        case 'string': {
          argument.split(' ').forEach((className) => classNames.add(className));
          break;
        }
        case 'object': {
          if (!argument) continue;

          // Iterate through the props in the object
          for (const key in argument) {
            const value = argument[key];

            // Only add props that have the true value
            if (value) classNames.add(key);
          }
        }
      }
    }
    return Array.from(classNames).join(' ');
  }, [args]);
};

export default useClassNames;
