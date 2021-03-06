/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {validateRedirect} from '../redirectValidation';

describe('validateRedirect', () => {
  test('validate good redirects without throwing', () => {
    expect(() => {
      validateRedirect({
        from: '/fromSomePath',
        to: '/toSomePath',
      });
      validateRedirect({
        from: '/from/Some/Path',
        to: '/toSomePath',
      });
      validateRedirect({
        from: '/fromSomePath',
        to: '/toSomePath',
      });
      validateRedirect({
        from: '/fromSomePath',
        to: '/to/Some/Path',
      });
    }).not.toThrow();
  });

  test('throw for bad redirects', () => {
    expect(() =>
      validateRedirect({
        from: 'https://fb.com/fromSomePath',
        to: '/toSomePath',
      }),
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      validateRedirect({
        from: '/fromSomePath',
        to: 'https://fb.com/toSomePath',
      }),
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      validateRedirect({
        from: '/fromSomePath',
        to: '/toSomePath?queryString=xyz',
      }),
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      validateRedirect({
        from: null as unknown as string,
        to: '/toSomePath?queryString=xyz',
      }),
    ).toThrowErrorMatchingSnapshot();

    expect(() =>
      validateRedirect({
        from: ['heyho'] as unknown as string,
        to: '/toSomePath?queryString=xyz',
      }),
    ).toThrowErrorMatchingSnapshot();
  });
});
