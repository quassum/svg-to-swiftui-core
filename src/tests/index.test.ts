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
  const svgValue = `<svg width="300px" height="300px" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M100,100 C100,59.875 100,33.2083333 100,20 C100,6.79166667 106.666667,0.124666263 120,-0.00100120993 L180,-0.00100120993 C193.333333,-0.00387801145 200,6.66312239 200,20 C200,33.3368776 200,60.0035443 200,100 C240,100 266.666667,100 280,100 C293.334856,100 300.002284,106.666667 300.002284,120 L300.002284,180 C300.052004,193.333333 293.384576,200 280,200 C266.615424,200 239.949124,200 200.001101,200 C200.001835,240 200.001835,266.666667 200.001101,280 C200.000367,293.334213 193.333333,300.001319 180,300.001319 L120,300.001319 C106.666667,300.109608 100,293.442502 100,280 C100,266.557498 100,239.890832 100,200 C60,200 33.3333333,200 20,200 C6.66605299,200 -0.000920519104,193.333333 -0.000920519104,180 L-0.000920519104,120 C-0.0324730702,106.666667 6.63450044,100 20,100 C33.3654996,100 60.0321662,100 100,100 Z" id="Path" fill="#000000"></path>
    </g>
</svg>`;

  const expectedResult = `struct MyCustomShape: Shape {
func path(in rect: CGRect) -> Path {
var path = Path()
let width = rect.size.width
let height = rect.size.height
path.move(to: CGPoint(x: 0.33333*width, y: 0.33333*height))
path.addCurve(to: CGPoint(x: 0.33333*width, y: 0.06667*height),control1: CGPoint(x: 0.33333*width, y: 0.19958*height),control2: CGPoint(x: 0.33333*width, y: 0.11069*height))
path.addCurve(to: CGPoint(x: 0.4*width, y: 0),control1: CGPoint(x: 0.33333*width, y: 0.02264*height),control2: CGPoint(x: 0.35556*width, y: 0.00042*height))
path.addLine(to: CGPoint(x: 0.6*width, y: 0))
path.addCurve(to: CGPoint(x: 0.66667*width, y: 0.06667*height),control1: CGPoint(x: 0.64444*width, y: -0.00001*height),control2: CGPoint(x: 0.66667*width, y: 0.02221*height))
path.addCurve(to: CGPoint(x: 0.66667*width, y: 0.33333*height),control1: CGPoint(x: 0.66667*width, y: 0.11112*height),control2: CGPoint(x: 0.66667*width, y: 0.20001*height))
path.addCurve(to: CGPoint(x: 0.93333*width, y: 0.33333*height),control1: CGPoint(x: 0.8*width, y: 0.33333*height),control2: CGPoint(x: 0.88889*width, y: 0.33333*height))
path.addCurve(to: CGPoint(x: 1.00001*width, y: 0.4*height),control1: CGPoint(x: 0.97778*width, y: 0.33333*height),control2: CGPoint(x: 1.00001*width, y: 0.35556*height))
path.addLine(to: CGPoint(x: 1.00001*width, y: 0.6*height))
path.addCurve(to: CGPoint(x: 0.93333*width, y: 0.66667*height),control1: CGPoint(x: 1.00017*width, y: 0.64444*height),control2: CGPoint(x: 0.97795*width, y: 0.66667*height))
path.addCurve(to: CGPoint(x: 0.66667*width, y: 0.66667*height),control1: CGPoint(x: 0.88872*width, y: 0.66667*height),control2: CGPoint(x: 0.79983*width, y: 0.66667*height))
path.addCurve(to: CGPoint(x: 0.66667*width, y: 0.93333*height),control1: CGPoint(x: 0.66667*width, y: 0.8*height),control2: CGPoint(x: 0.66667*width, y: 0.88889*height))
path.addCurve(to: CGPoint(x: 0.6*width, y: height),control1: CGPoint(x: 0.66667*width, y: 0.97778*height),control2: CGPoint(x: 0.64444*width, y: height))
path.addLine(to: CGPoint(x: 0.4*width, y: height))
path.addCurve(to: CGPoint(x: 0.33333*width, y: 0.93333*height),control1: CGPoint(x: 0.35556*width, y: 1.00037*height),control2: CGPoint(x: 0.33333*width, y: 0.97814*height))
path.addCurve(to: CGPoint(x: 0.33333*width, y: 0.66667*height),control1: CGPoint(x: 0.33333*width, y: 0.88852*height),control2: CGPoint(x: 0.33333*width, y: 0.79964*height))
path.addCurve(to: CGPoint(x: 0.06667*width, y: 0.66667*height),control1: CGPoint(x: 0.2*width, y: 0.66667*height),control2: CGPoint(x: 0.11111*width, y: 0.66667*height))
path.addCurve(to: CGPoint(x: 0, y: 0.6*height),control1: CGPoint(x: 0.02222*width, y: 0.66667*height),control2: CGPoint(x: 0, y: 0.64444*height))
path.addLine(to: CGPoint(x: 0, y: 0.4*height))
path.addCurve(to: CGPoint(x: 0.06667*width, y: 0.33333*height),control1: CGPoint(x: -0.00011*width, y: 0.35556*height),control2: CGPoint(x: 0.02212*width, y: 0.33333*height))
path.addCurve(to: CGPoint(x: 0.33333*width, y: 0.33333*height),control1: CGPoint(x: 0.11122*width, y: 0.33333*height),control2: CGPoint(x: 0.20011*width, y: 0.33333*height))
path.closeSubpath()



return path
}
}`;

  const result = convert(svgValue, {
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
