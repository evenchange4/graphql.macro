// @flow

import macro from '../macro';
import index from '../index';

describe('index', () => {
  it('refers to macro correctly', () => {
    expect(index).toBe(macro);
  });
});
