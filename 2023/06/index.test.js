import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getData,
  getDistances,
  getRealData,
  numberOfWaysToWin,
} from './index.js';

const s = ['Time:      7  15   30', 'Distance:  9  40  200'];

describe('A', () => {
  it('should return an array with the possibles distances traveled given the time a race last', () => {
    assert.deepStrictEqual(getDistances(7), [0, 6, 10, 12, 12, 10, 6, 0]);
  });

  it('should return the numbers of ways that could be won given a time and a distance', () => {
    assert.equal(numberOfWaysToWin(7, 9), 4);
    assert.equal(numberOfWaysToWin(15, 40), 8);
    assert.equal(numberOfWaysToWin(30, 200), 9);
  });

  it('should return an array of times and distances', () => {
    assert.deepStrictEqual(getData(s), [
      [7, 15, 30],
      [9, 40, 200],
    ]);
  });
});

describe('B', () => {
  it('should return an array of times and distances', () => {
    assert.deepStrictEqual(getRealData(s), [[71530], [940200]]);
  });
});
