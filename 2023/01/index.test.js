import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getCalibrationValue,
  getNumbersLine,
  equivalenceMapping as em,
  getStringPositionsLine,
  getNumbersPositionsLine,
  transformString,
} from './index.js';

describe('A', () => {
  it('should return the first digit and last digit of a string', () => {
    assert.deepStrictEqual(getNumbersLine('1abc2'), ['1', '2']);
    assert.deepStrictEqual(getNumbersLine('pqr3stu8vwx'), ['3', '8']);
    assert.deepStrictEqual(getNumbersLine('a1b2c3d4e5f'), ['1', '5']);
    assert.deepStrictEqual(getNumbersLine('treb7uchet'), ['7', '7']);
  });

  it('should return the calibration value of a string', () => {
    assert.equal(getCalibrationValue('1abc2'), 12);
    assert.equal(getCalibrationValue('pqr3stu8vwx'), 38);
    assert.equal(getCalibrationValue('a1b2c3d4e5f'), 15);
    assert.equal(getCalibrationValue('treb7uchet'), 77);
  });
});

describe('B', () => {
  it('get all the positions of a string inside another string', () => {
    assert.deepStrictEqual(getStringPositionsLine('nine', 'two1nine'), [
      ['nine', 4],
    ]);
    assert.deepStrictEqual(getStringPositionsLine('1', 'two1nine'), [['1', 3]]);
    assert.deepStrictEqual(getStringPositionsLine('7', '7sixj7'), [
      ['7', 0],
      ['7', 5],
    ]);
    assert.deepStrictEqual(getStringPositionsLine('3', '4nineeightseven2'), []);
    assert.deepStrictEqual(getStringPositionsLine('two', 'xtwone3four'), [
      ['two', 1],
    ]);
    assert.deepStrictEqual(getStringPositionsLine('one', 'xtwone3four'), [
      ['one', 3],
    ]);
    assert.deepStrictEqual(getStringPositionsLine('3', 'xtwone3four'), [
      ['3', 6],
    ]);
    assert.deepStrictEqual(getStringPositionsLine('four', 'xtwone3four'), [
      ['four', 7],
    ]);
  });

  it('get all the positions of all numbers in a string', () => {
    assert.deepStrictEqual(getNumbersPositionsLine('4nineeightseven2', em), [
      ['4', 0],
      ['9', 1],
      ['8', 5],
      ['7', 10],
      ['2', 15],
    ]);
    assert.deepStrictEqual(getNumbersPositionsLine('two1nine', em), [
      ['2', 0],
      ['1', 3],
      ['9', 4],
    ]);
    assert.deepStrictEqual(getNumbersPositionsLine('xtwone3four', em), [
      ['2', 1],
      ['1', 3],
      ['3', 6],
      ['4', 7],
    ]);
  });

  it('should return a new string with only numbers', () => {
    assert.equal(transformString('7pqrstsixteen', em), '76');
    assert.equal(transformString('abcone2threexyz', em), '123');
    assert.equal(transformString('xtwone3four', em), '2134');
  });
});
