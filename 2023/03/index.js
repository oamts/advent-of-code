import { dirname, resolve } from 'path';
import { readFile } from '../utils.js';
import { fileURLToPath } from 'url';

const modulePath = dirname(fileURLToPath(import.meta.url));

/**
 * @param {string}  fileName
 */
const P1 = async (fileName) => {
  const filePath = resolve(modulePath, `./${fileName}1.txt`);

  const lines = await readFile(filePath);

  const validNumbers = getValidNumbersFromMatrix(lines);

  const total = validNumbers.reduce((acc, v) => acc + v, 0);

  console.log('P1', fileName, total);
};

/**
 * @param {unknown[][]} matrix
 * @returns {number[]}
 */
export const getValidNumbersFromMatrix = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let numberTemp = '';
  /** @type {number[]} */
  const validNumbers = [];
  let numberIsValid = false;

  for (let row = 0; row < rows; row++) {
    numberTemp = '';
    for (let col = 0; col < cols; col++) {
      const element = matrix[row][col];
      const endOfLine = col + 1 === cols;

      if (isNumber(element)) {
        numberTemp += element;
        if (hasAdjacentSymbol(matrix, row, col)) numberIsValid = true;
      }
      if ((!isNumber(element) && numberTemp.length !== 0) || endOfLine) {
        if (numberIsValid) validNumbers.push(Number(numberTemp));
        numberTemp = '';
        numberIsValid = false;
      }
    }
  }
  return validNumbers;
};

/**
 * @param {unknown} element
 * @returns {boolean}
 */
export const isNumber = (element) => {
  return /\d/.test(element);
};

/**
 * @param {unknown[][]} matrix
 * @param {number} row
 * @param {number} col
 * @returns {boolean}
 */
const hasAdjacentSymbol = (matrix, row, col) => {
  return getAdjacentElements(matrix, row, col).some(
    (element) => !isNumber(element) && element !== '.',
  );
};

/**
 * @param {unknown[][]} matrix
 * @param {number} row
 * @param {number} col
 * @returns {unknown[]}
 */
function getAdjacentElements(matrix, row, col) {
  return getAdjacentPositions(matrix, row, col).map(
    ([row, col]) => matrix[row][col],
  );
}

/**
 * @param {number[][]} matrix
 * @param {number} row
 * @param {number} col
 * @returns {[number,number][]}
 */
function getAdjacentPositions(matrix, row, col) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const adjacentPositions = [];

  // Define offsets for adjacent positions: up, down, left, right
  const offsets = [
    [-1, 0], // North
    [-1, 1], // North-east
    [0, 1], // East
    [1, 1], // South-east
    [1, 0], // South
    [1, -1], // South-west
    [0, -1], // West
    [-1, -1], // North-west
  ];

  // Check each offset and add adjacent positions within matrix bounds
  for (const [rowOffset, colOffset] of offsets) {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;

    // Check if the new position is within bounds of the matrix
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      adjacentPositions.push([newRow, newCol]);
    }
  }

  return adjacentPositions;
}

await P1('demo');
await P1('input');
