import { dirname, resolve } from 'path';
import { multiplyElements, readFile } from '../utils.js';
import { fileURLToPath } from 'url';

const modulePath = dirname(fileURLToPath(import.meta.url));

/**
 * @param {string}  fileName
 */
const P1 = async (fileName) => {
  const filePath = resolve(modulePath, `./${fileName}1.txt`);

  const lines = await readFile(filePath);

  const [times, distances] = getData(lines);

  const waysToWin = times.map((_, index) =>
    numberOfWaysToWin(times[index], distances[index]),
  );

  const total = multiplyElements(waysToWin);

  console.log('P1', total);
};

/**
 * @param {string}  fileName
 */
const P2 = async (fileName) => {
  const filePath = resolve(modulePath, `./${fileName}2.txt`);

  const lines = await readFile(filePath);

  const [times, distances] = getRealData(lines);

  const waysToWin = times.map((_, index) =>
    numberOfWaysToWin(times[index], distances[index]),
  );

  const total = multiplyElements(waysToWin);

  console.log('P2', total);
};

/**
 * @param {number} time
 * @returns {number[]}
 */
export const getDistances = (time) => {
  let distance;
  let distances = [];
  for (
    let timeHoldingButton = 0;
    timeHoldingButton <= time;
    timeHoldingButton++
  ) {
    distance = timeHoldingButton * (time - timeHoldingButton);
    distances.push(distance);
  }
  return distances;
};

/**
 * @param {number} time
 * @param {number} distance
 * @returns {number}
 */
export const numberOfWaysToWin = (time, distance) => {
  return getDistances(time).filter((d) => d > distance).length;
};

/**
 * @param {[string,string]} lines
 * @returns {[number[],number[]]}
 */
export const getData = (lines) => {
  return lines.map((s) => s.match(/(\d|,)+/g).map(Number));
};

/**
 * @param {[string,string]} lines
 * @returns {[number[],number[]]}
 */
export const getRealData = (lines) => {
  return lines.map((s) => [Number(s.replace(/\D/g, ''))]);
};

await P1('demo');
await P1('input');
await P2('demo');
await P2('input');
