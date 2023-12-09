import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { addInfoToMap } from './index.js';

describe('A', () => {
  it('should add the info of the node in a empty map', () => {
    const map = { AAA: ['BBB', 'CCC'] };
    assert.deepStrictEqual(addInfoToMap('AAA = (BBB, CCC)', {}), map);
  });

  it('should add the info of the node in a map', () => {
    const map = { AAA: ['BBB', 'CCC'] };
    const map2 = { ...map, BBB: ['DDD', 'EEE'] };
    assert.deepStrictEqual(addInfoToMap('BBB = (DDD, EEE)', map), map2);
  });
});
