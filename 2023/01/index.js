import { dirname, resolve } from 'path';
import { readFile } from '../utils.js';
import { fileURLToPath } from 'url';

const modulePath = dirname(fileURLToPath(import.meta.url));
export const equivalenceMapping = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

/**
 * @param {string}  fileName
 */
const P1 = async (fileName) => {
  const filePath = resolve(modulePath, `./${fileName}1.txt`);

  const lines = await readFile(filePath);
  let total = 0;
  for (const line of lines) {
    total = total + getCalibrationValue(line);
  }

  console.log('P1', fileName, total);
};

/**
 * @param {string}  fileName
 */
const P2 = async (fileName) => {
  const filePath = resolve(modulePath, `./${fileName}2.txt`);

  const lines = await readFile(filePath);
  let total = 0;
  for (const line of lines) {
    const newLine = transformString(line, equivalenceMapping);
    const calibrationValue = getCalibrationValue(newLine);
    total = total + calibrationValue;
  }

  console.log('P2', fileName, total);
};

/**
 * @param {string}  line
 * @returns {[string,string]}
 */
export const getNumbersLine = (line) => {
  const numbers = line.split('').filter((char) => char >= '0' && char <= '9');
  const first = numbers.at(0);
  const last = numbers.at(-1);

  return [first, last];
};

/**
 * @param {string}  line
 * @returns {number}
 */
export const getCalibrationValue = (line) => {
  const [first, last] = getNumbersLine(line);
  return Number(first + last);
};

/**
 * @param {string}  string
 * @param {string}  line
 * @returns {[string,number][]}
 */
export const getStringPositionsLine = (string, line) => {
  return [...line.matchAll(new RegExp(string, 'gi'))].map((a) => [
    a[0],
    a.index,
  ]);
};

/**
 * @param {string}  line
 * @param {Object.<string, string>}  equivalenceMapping
 * @returns {[string,number][]}
 */
export const getNumbersPositionsLine = (line, equivalenceMapping) => {
  return Object.keys(equivalenceMapping)
    .map((number) => getStringPositionsLine(number, line))
    .filter((array) => array.length > 0)
    .flat()
    .sort((a, b) => a[1] - b[1])
    .map(([number, position]) => [equivalenceMapping[number], position]);
};

/**
 * @param {string}  line
 * @param {Object.<string, string>}  equivalenceMapping
 * @returns {string}
 */
export const transformString = (line, equivalenceMapping) => {
  return getNumbersPositionsLine(line, equivalenceMapping)
    .map(([number]) => number)
    .join('');
};

await P1('demo');
await P1('input');
await P2('demo');
await P2('input');
