/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import test from 'ava';

import { meaningPromiseOrThrow } from './promise';

[
  { value: undefined, label: 'undefined' },
  { value: null, label: 'null' },
  { value: '', label: 'empty string' },
  { value: [], label: 'empty array' },
  { value: {}, label: 'empty object' },
].forEach(({ value, label }) => {
  test('meaningPromiseOrThrow intercept ' + label, async (t) => {
    const message = 'My custom error message';
    const result = await Promise.resolve(value)
      .then(meaningPromiseOrThrow(message))
      .catch((e) => e.message);
    return t.is(result, message);
  });
});

[
  { value: 'some string', label: 'string' },
  { value: true, label: 'true' },
  { value: false, label: 'false' },
  { value: 0, label: 'zero' },
  { value: 42, label: 'number' },
  { value: [42], label: 'array' },
  { value: { prop: 42 }, label: 'object' },
].forEach(({ value, label }) => {
  test('meaningPromiseOrThrow ignore ' + label, async (t) => {
    const message = 'My custom error message';
    const result = await Promise.resolve(value)
      .then(meaningPromiseOrThrow(message))
      .catch((e) => e.message);
    return t.is(result, value);
  });
});
