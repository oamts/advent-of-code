import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getCards, getNumberOfSimilarElements } from './index.js';

describe('A', () => {
  it('should return the two array of card from line', () => {
    assert.deepStrictEqual(
      getCards('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'),
      [
        ['41', '48', '83', '86', '17'],
        ['83', '86', '6', '31', '17', '9', '48', '53'],
      ],
    );
  });

  it('should return the number of similar elements of an array', () => {
    assert.deepStrictEqual(
      getNumberOfSimilarElements(
        ['41', '48', '83', '86', '17'],
        ['83', '86', '6', '31', '17', '9', '48', '53'],
      ),
      4,
    );
  });
});
