import {readFileSync} from 'fs';
import {resolve} from 'path';
import {convert} from '../index';

const contentDirectory = resolve(process.cwd(), 'content');

/**
 * Will load a file from `content` directory in the root of
 * the project.
 * @param filename Name of the file to load
 */
const loadContentFile = (filename: string) =>
  readFileSync(resolve(contentDirectory, filename), 'utf8');

test('conversion-1', () => {
  const rawSVG = loadContentFile('plusRounded.svg');
  const expectedResult = loadContentFile('plusRounded.swift');
  const result = convert(rawSVG, {
    precision: 5,
  });
  expect(result).toBe(expectedResult);
});

test('convert-circle', () => {
  const rawSVG = loadContentFile('circle.svg');
  const expectedResult = loadContentFile('circle.swift');
  const result = convert(rawSVG, {
    precision: 2,
    structName: 'CircleShape',
  });
  expect(result).toBe(expectedResult);
});

test('convert-rectangle', () => {
  const rawSVG = loadContentFile('rect.svg');
  const expectedResult = loadContentFile('rect.swift');
  const result = convert(rawSVG, {
    precision: 6,
    structName: 'RectangleShape',
  });
  expect(result).toBe(expectedResult);
});
