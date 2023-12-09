import { open } from 'node:fs/promises';

/**
 * @param {string}  filePath
 */
export const readFile = async (filePath) => {
  const file = await open(filePath);

  const lines = [];
  for await (const line of file.readLines()) {
    lines.push(line);
  }

  return lines;
};

/**
 * @param {number[]}  arr
 * @returns {number}
 */
export const multiplyElements = (arr) => {
  return Object.values(arr).reduce((a, b) => a * b, 1);
};

/**
 * @param {number}  x
 * @param {number}  y
 * @returns {number}
 */
const greatestCommonDivisor = (x, y) => {
  let [a, b] = x < y ? [x, y] : [y, x];

  while (true) {
    if (b === 0) return a;
    a = a % b;

    if (a === 0) return b;
    b = b % a;
  }
};

/**
 * @param {number}  a
 * @param {number}  b
 * @returns {number}
 */
const leastCommonMultiple = (a, b) => (a * b) / greatestCommonDivisor(a, b);

/**
 * @param {number[]}  arr
 * @returns {number}
 */
export const leastCommonMultipleBetweenList = (arr) =>
  arr.reduce((acc, el) => leastCommonMultiple(acc, el), 1);
