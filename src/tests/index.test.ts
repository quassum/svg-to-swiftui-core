import {convert} from '../index';
import {loadContentFile} from './utils';

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