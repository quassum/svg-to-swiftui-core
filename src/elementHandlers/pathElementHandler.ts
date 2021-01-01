import {SVGPathData} from 'svg-pathdata';
import {ElementNode} from 'svg-parser';

import {TranspilerOptions} from '../types';
import {SwiftGenerator} from './types';

import {SVGPathAttributes} from '../svgTypes';
import {SVGCommand} from 'svg-pathdata/lib/types';

import {generateMoveToSwift} from './pathElementGenerators/moveToGenerator';
import {generateLineToSwift} from './pathElementGenerators/lineToGenerator';
import {generateClosePathSwift} from './pathElementGenerators/closePathGenerator';
import {generateCubicCurveSwift} from './pathElementGenerators/cubicCurveGenerator';

/**
 * Converts SVG Path element to SwiftUI path string.
 * @param element SVG Path Element
 * @param options Transpiler options
 */
export default function handlePathElement(
  element: ElementNode,
  options: TranspilerOptions
): string[] {
  const properties = element.properties as unknown;

  if (properties) {
    const props = properties as SVGPathAttributes;

    if (!props.d) {
      throw new Error(
        'Parameter `d` has to be provided on the <path> element!'
      );
    }

    options.lastPathId++;

    console.log('Props', props);

    const pathData = new SVGPathData(props.d).toAbs();
    return convertPathToSwift(pathData.commands, options);
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
  const swiftAccumulator: string[] = [];

  console.log('Data points', data);

  for (let i = 0; i < data.length; i++) {
    const el = data[i];

    // Handle data depending on command type.
    switch (el.type) {
      // Command M
      case SVGPathData.MOVE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        swiftAccumulator.push(...generateMoveToSwift(d, options));
        break;
      }
      // Command L
      case SVGPathData.LINE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        swiftAccumulator.push(...generateLineToSwift(d, options));
        break;
      }
      // Command H
      case SVGPathData.HORIZ_LINE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        console.error('Horizontal line is not supported yet');
        break;
      }
      // Command V
      case SVGPathData.VERT_LINE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        // TODO: Implement this commend
        console.error('Vertical line is not supported yet');
        break;
      }
      // Command Z
      case SVGPathData.CLOSE_PATH: {
        swiftAccumulator.push(...generateClosePathSwift(null, options));
        break;
      }
      // Command Q
      case SVGPathData.QUAD_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        // TODO: Implement this commend
        console.error('Quad curve is not supported yet');
        break;
      }
      // Command T
      case SVGPathData.SMOOTH_QUAD_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        // TODO: Implement this commend
        console.error('Smooth quad is not supported yet');
        break;
      }
      // Command C
      case SVGPathData.CURVE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        swiftAccumulator.push(...generateCubicCurveSwift(d, options));
        break;
      }
      // Command S
      case SVGPathData.SMOOTH_CURVE_TO: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        const prevElement = data[i - 1];

        // Setup first control point
        let x1 = d.x;
        let y1 = d.y;

        if (
          prevElement.type === SVGPathData.CURVE_TO ||
          prevElement.type === SVGPathData.SMOOTH_CURVE_TO
        ) {
          x1 = prevElement.x + (prevElement.x - prevElement.x2);
          y1 = prevElement.y + (prevElement.y - prevElement.y2);
        }

        const swiftLines = generateCubicCurveSwift({...d, x1, y1}, options);

        swiftAccumulator.push(...swiftLines);
        break;
      }
      // Command A
      case SVGPathData.ARC: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {type, relative, ...d} = el;
        // TODO: Implement this commend
        console.error('Arc is not supported yet');
        break;
      }
    }
  }

  return swiftAccumulator;
};
