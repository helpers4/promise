/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * Function that generates a "then" function for Promise that avoid any empty
 * data by throwing an error.
 *
 * Input:
 *  - any       => any
 *  - 0         => 0
 *  - boolean   => boolean
 *  - ""        => throw an error
 *  - null      => throw an error
 *  - undefined => throw an error
 *  - []        => throw an error
 *  - {}        => throw an error
 *
 * ### Example (es module)
 * ```js
 * import { meaningPromiseOrThrow } from '@helpers4/promise'
 * Promise.resolve('')
 *   .then(meaningPromiseOrThrow('My custom error message'))
 *   .then(console.log)
 * // => 'My custom error message'
 * ```
 *
 * @param error - the error message thrown if the data is `null`, `undefined` or empty string
 */
export function meaningPromiseOrThrow<T>(
  error: string
): (data: T) => T | never {
  return (data: unknown) => {
    if (
      data === undefined ||
      data === null ||
      data === '' ||
      isEmptyObject(data) ||
      // eslint-disable-next-line functional/prefer-readonly-type, @typescript-eslint/no-explicit-any
      isEmptyArray(data as any[])
    ) {
      // eslint-disable-next-line functional/no-throw-statement
      throw new Error(error);
    } else {
      return data as T;
    }
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isEmptyObject(obj: Object): boolean {
  return (
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

// eslint-disable-next-line functional/prefer-readonly-type, @typescript-eslint/no-explicit-any
function isEmptyArray(arr: any[]): boolean {
  return arr.constructor === Array && arr.length === 0;
}
