import { dirname, resolve } from 'path';
import { readFile } from '../utils.js';
import { fileURLToPath } from 'url';

const modulePath = dirname(fileURLToPath(import.meta.url));
export const referenceObj = {
  blue: 14,
  red: 12,
  green: 13,
};

/**
 * @param {string}  fileName
 */
const P1 = async (fileName) => {
  const filePath = resolve(modulePath, `./${fileName}1.txt`);

  const lines = await readFile(filePath);
  let total = 0;

  for (const line of lines) {
    const { gameNumber, sets } = getGameNumberAndSets(line);
    if (isSetsPossible(sets, referenceObj)) {
      total = total + gameNumber;
    }
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
    const { sets } = getGameNumberAndSets(line);
    const ballCount = fewestNumberOfCubes(sets);
    const setCubePower = Object.values(ballCount).reduce((a, b) => a * b, 1);
    total = total + setCubePower;
  }

  console.log('P1', fileName, total);
};

/**
 * A number, or a string containing a number.
 * @typedef {{
 *   blue: number;
 *   red: number;
 *   green: number;
 * }} BallCount
 */

/**
 * @param {string}  set
 * @returns {BallCount}
 */
export const getBallsCount = (set) => {
  const ballLines = set
    .split(',')
    .map((ballLine) => ballLine.trim().split(' '))
    .map(([number, color]) => ({ [color]: Number(number) }));

  const ballCount = { blue: 0, red: 0, green: 0 };
  const finalBallCount = Object.assign({}, ...ballLines);
  return { ...ballCount, ...finalBallCount };
};

/**
 * @param {string} line
 * @returns {{
 *   gameNumber: number;
 *   sets: string;
 * }}
 */
export const getGameNumberAndSets = (line) => {
  const [gameString, setsString] = line.split(':');
  const gameNumber = Number(gameString.split(' ')[1]);
  return { gameNumber, sets: setsString };
};

/**
 * @param {string} set
 * @param {BallCount} referenceObj
 * @returns {boolean}
 */
export const isSetPossible = (set, referenceObj) => {
  const ballsCount = getBallsCount(set);
  return (
    ballsCount.green <= referenceObj.green &&
    ballsCount.red <= referenceObj.red &&
    ballsCount.blue <= referenceObj.blue
  );
};

/**
 * @param {string} sets
 * @param {BallCount} referenceObj
 * @returns {boolean}
 */
export const isSetsPossible = (sets, referenceObj) => {
  return sets
    .split(';')
    .map((set) => isSetPossible(set, referenceObj))
    .every((v) => v === true);
};

/**
 * @param {string} sets
 * @returns {BallCount}
 */
export const fewestNumberOfCubes = (sets) => {
  return sets
    .split(';')
    .map(getBallsCount)
    .reduce(
      (accumulator, currentValue) => {
        return {
          blue: Math.max(currentValue.blue, accumulator.blue),
          red: Math.max(currentValue.red, accumulator.red),
          green: Math.max(currentValue.green, accumulator.green),
        };
      },
      { blue: 0, red: 0, green: 0 },
    );
};

await P1('demo');
await P1('input');
await P2('demo');
await P2('input');
