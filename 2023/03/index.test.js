import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isNumber } from './index.js';

describe('A', () => {
  it('check if an element is a number', () => {
    assert.equal(isNumber('1'), true);
    assert.equal(isNumber('.'), false);
    assert.equal(isNumber('+'), false);
    assert.equal(isNumber('9'), true);
    assert.equal(isNumber('#'), false);
  });
});
