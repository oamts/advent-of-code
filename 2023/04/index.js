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
  let total = 0;
  for (const line of lines) {
    const [card1, card2] = getCards(line);
    const n = getNumberOfSimilarElements(card1, card2);
    if (n > 0) total = total + Math.pow(2, n - 1);
  }
  console.log('P1', fileName, total);
};

/**
 * @param {string} line
 * @returns {[string[],string[]]}
 */
export const getCards = (line) => {
  return line
    .split(':')
    .at(1)
    .split('|')
    .map((cardString) => cardString.split(' '))
    .map((cardArray) => cardArray.filter((el) => el !== '' && el !== ' '));
};

/**
 * @param {unknown[]} arr1
 * @param {unknown[]} arr2
 * @returns {number}
 */
export const getNumberOfSimilarElements = (arr1, arr2) => {
  return arr1.filter((item) => arr2.includes(item)).length;
};

await P1('demo');
await P1('input');
