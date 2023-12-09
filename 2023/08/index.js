import { dirname, resolve } from 'path';
import { leastCommonMultipleBetweenList, readFile } from '../utils.js';
import { fileURLToPath } from 'url';

const modulePath = dirname(fileURLToPath(import.meta.url));

/**
 * @typedef {Record<String, [string,string]>} MAP
 */

/**
 * @param {string}  fileName
 */
const P1 = async (fileName) => {
  const filePath = resolve(modulePath, `./${fileName}1.txt`);

  const lines = await readFile(filePath);
  const [path, _, ...mapLines] = lines;
  const map = mapLines.reduce((acc, cur) => addInfoToMap(cur, acc), {});

  const steps = getNumberOfStepsToFinish(
    map,
    'AAA',
    path,
    (currentPosition) => currentPosition !== 'ZZZ',
  );

  console.log('P1', fileName, steps);
};

/**
 * @param {string}  fileName
 */
const P2 = async (fileName) => {
  const filePath = resolve(modulePath, `./${fileName}2.txt`);

  const lines = await readFile(filePath);
  const [path, _, ...mapLines] = lines;
  const map = mapLines.reduce((acc, cur) => addInfoToMap(cur, acc), {});

  let initialPositions = Object.keys(map).filter((p) => p.at(2) === 'A');
  const numberOfSteps = initialPositions.map((initialPosition) => {
    return getNumberOfStepsToFinish(
      map,
      initialPosition,
      path,
      (currentPosition) => currentPosition.at(2) !== 'Z',
    );
  });

  const totalSteps = leastCommonMultipleBetweenList(numberOfSteps);

  console.log('P2', fileName, totalSteps);
};

/**
 * @param {MAP} map
 * @param {string}  initialPosition
 * @param {string}  path
 * @param {(string)=>boolean}  finishFn
 * @returns {number}
 */
const getNumberOfStepsToFinish = (map, initialPosition, path, finishFn) => {
  let currentPosition = initialPosition;
  let steps = 0;
  do {
    currentPosition = navigate(map, path, currentPosition);
    steps = steps + path.length;
  } while (finishFn(currentPosition));
  return steps;
};

/**
 * @param {string}  info
 * @param {MAP} map
 * @returns {MAP}
 */
export const addInfoToMap = (info, map) => {
  const [key, left, right] = info
    .replace(' = (', ',')
    .replace(', ', ',')
    .replace(')', '')
    .split(',');
  return { ...map, ...{ [key]: [left, right] } };
};

const navigate = (map, path, currentPosition) => {
  const [direction, ...newPath] = path;
  const position = map[currentPosition][direction === 'L' ? 0 : 1];
  if (newPath.length === 0) return position;
  return navigate(map, newPath, position);
};

await P1('demo');
await P1('input');
await P2('demo');
await P2('input');
