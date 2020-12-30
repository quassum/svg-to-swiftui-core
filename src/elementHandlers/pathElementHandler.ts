/* eslint-disable no-case-declarations */
import {format} from 'mathjs';
import {SVGPathData} from 'svg-pathdata';
import {ElementNode} from 'svg-parser';
import {TranspilerOptions} from '../types';
import {SwiftGenerator} from './types';
import {SVGPathAttributes} from '../svgTypes';
import {SVGCommand} from 'svg-pathdata/lib/types';
import {clampNormalisedSizeProduct} from '../utils';

/**
 * Converts SVG Path element to SwiftUI path string.
 * @param element SVG Path Element
 * @param options Transpiler options
 */
export default function handlePathElement(
  element: ElementNode,
  options: TranspilerOptions
): string {
  const properties = element.properties as unknown;

  if (properties) {
    const props = properties as SVGPathAttributes;

    options.lastPathId++;

    console.log('Props', props);

    const pathData = new SVGPathData(props.d).toAbs();
    const swiftString = convertPathToSwift(pathData.commands, options);

    return swiftString;
  } else {
    throw new Error('Path element does not have any properties!');
  }
}

/**
 * Converts a list of `SVGCommand`s to SwiftUI Path
 * @param data Path data if SVGCommand[] type.
 * @param options Transpiler options
 */
const convertPathToSwift: SwiftGenerator<SVGCommand[]> = (data, options) => {
  let swiftString = '';

  console.log('Data points', data);

  for (const el of data) {
    // Handle data depending on command type.
    switch (el.type) {
      // Command M
      case SVGPathData.MOVE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        swiftString += generateMoveToSwift(d, options) + '\n';
        break;
      }
      // Command L
      case SVGPathData.LINE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        swiftString += generateLineToSwift(d, options) + '\n';
        break;
      }
      // Command H
      case SVGPathData.HORIZ_LINE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        break;
      }
      // Command V
      case SVGPathData.VERT_LINE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        // TODO: Implement this commend
        break;
      }
      // Command Z
      case SVGPathData.CLOSE_PATH: {
        swiftString += generateClosePathSwift(null, options) + '\n';
        break;
      }
      // Command Q
      case SVGPathData.QUAD_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        // TODO: Implement this commend
        break;
      }
      // Command T
      case SVGPathData.SMOOTH_QUAD_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        // TODO: Implement this commend
        break;
      }
      // Command C
      case SVGPathData.CURVE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        swiftString += generateCubicCurveSwift(d, options) + '\n';
        break;
      }
      // Command S
      case SVGPathData.SMOOTH_CURVE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        // TODO: Implement this commend
        break;
      }
      // Command A
      case SVGPathData.ARC: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...data} = el;
        // TODO: Implement this commend
        break;
      }
    }
  }

  return swiftString;
};

const generateMoveToSwift: SwiftGenerator<{x: number; y: number}> = (
  data,
  options
) => {
  const {x, y} = data;
  const fmtOpts = {
    notation: 'fixed',
    precision: options.precision,
  };

  const px = parseFloat(format(x / options.viewBox.width, fmtOpts));
  const py = parseFloat(format(y / options.viewBox.height, fmtOpts));

  const new_x = clampNormalisedSizeProduct(px, 'width');
  const new_y = clampNormalisedSizeProduct(py, 'height');

  return `path.move(to: CGPoint(x: ${new_x}, y: ${new_y}))`;
};

const generateLineToSwift: SwiftGenerator<{x: number; y: number}> = (
  data,
  options
) => {
  const {x, y} = data;
  const fmtOpts = {
    notation: 'fixed',
    precision: options.precision,
  };

  const px = parseFloat(format(x / options.viewBox.width, fmtOpts));
  const py = parseFloat(format(y / options.viewBox.height, fmtOpts));

  const new_x = clampNormalisedSizeProduct(px, 'width');
  const new_y = clampNormalisedSizeProduct(py, 'height');

  return `path.addLine(to: CGPoint(x: ${new_x}, y: ${new_y}))`;
};

const generateClosePathSwift: SwiftGenerator<unknown> = (data, options) => {
  return 'path.closeSubpath()';
};

const generateCubicCurveSwift: SwiftGenerator<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x: number;
  y: number;
}> = (data, options) => {
  let {x1, y1, x2, y2, x, y} = data;
  const fmtOpts = {
    notation: 'fixed',
    precision: options.precision,
  };

  // Convert raw values into width/height relative values.
  x1 = parseFloat(format(x1 / options.viewBox.width, fmtOpts));
  y1 = parseFloat(format(y1 / options.viewBox.height, fmtOpts));

  x2 = parseFloat(format(x2 / options.viewBox.width, fmtOpts));
  y2 = parseFloat(format(y2 / options.viewBox.height, fmtOpts));

  x = parseFloat(format(x / options.viewBox.width, fmtOpts));
  y = parseFloat(format(y / options.viewBox.height, fmtOpts));

  // Prepare string values.
  const p1x_str = clampNormalisedSizeProduct(x, 'width');
  const p1y_str = clampNormalisedSizeProduct(y, 'height');
  const p2x_str = clampNormalisedSizeProduct(x1, 'width');
  const p2y_str = clampNormalisedSizeProduct(y1, 'height');
  const p3x_str = clampNormalisedSizeProduct(x2, 'width');
  const p3y_str = clampNormalisedSizeProduct(y2, 'height');

  return [
    `path.addCurve(to: CGPoint(x: ${p1x_str}, y: ${p1y_str}),`,
    `control1: CGPoint(x: ${p2x_str}, y: ${p2y_str}),`,
    `control2: CGPoint(x: ${p3x_str}, y: ${p3y_str}))`,
  ].join('');
};
