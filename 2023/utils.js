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
