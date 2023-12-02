import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  fewestNumberOfCubes,
  getBallsCount,
  isSetPossible,
  isSetsPossible,
  referenceObj,
} from './index.js';

const ballCountObj = (blue = 0, red = 0, green = 0) => ({
  blue,
  red,
  green,
});

describe('A', () => {
  it('should get balls count from set', () => {
    assert.deepStrictEqual(
      getBallsCount(' 3 blue, 4 red'),
      ballCountObj(3, 4, 0),
    );
    assert.deepStrictEqual(getBallsCount(' 2 green'), ballCountObj(0, 0, 2));
    assert.deepStrictEqual(
      getBallsCount(' 5 blue, 4 red, 13 green'),
      ballCountObj(5, 4, 13),
    );
  });

  it('has to check if a set is possible', () => {
    assert.equal(isSetPossible(' 2 green', referenceObj), true);
    assert.equal(
      isSetPossible(' 8 green, 6 blue, 20 red', referenceObj),
      false,
    );
    assert.equal(isSetPossible(' 1 red, 2 green, 6 blue', referenceObj), true);
    assert.equal(isSetPossible(' 3 green, 15 blue', referenceObj), false);
  });

  it('has to check if a group of sets is possible', () => {
    assert.equal(
      isSetsPossible(
        ' 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
        referenceObj,
      ),
      true,
    );
    assert.equal(
      isSetsPossible(
        ' 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
        referenceObj,
      ),
      false,
    );
  });
});

describe('A', () => {
  it('should return the fewest number of cubes of each color possible in a group of sets', () => {
    assert.deepStrictEqual(
      fewestNumberOfCubes(' 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'),
      ballCountObj(6, 4, 2),
    );
  });
});
