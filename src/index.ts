import {parse, RootNode} from 'svg-parser';
import {generateSwiftUIShape} from './stubs';
import {SwiftUIGeneratorConfig} from './types';

import {format} from 'prettier';

/**
 * This function converts SVG string into SwiftUI
 * Shape structure which is returned as a string.
 * @param rawSVGString SVG code as a raw string.
 * @param config Optional configuration object.
 */
export function convert(
  rawSVGString: string,
  config?: SwiftUIGeneratorConfig
): string {
  const SVG_AST = parse(rawSVGString);
  return swiftUIGenerator(SVG_AST, config);
}

/**
 * Generates SwiftUI Shape string from SVG HAST (Abstract Syntax Tree).
 * @param svgAST Parsed SVG Abstract Syntax Tree.
 * @param config Optional configuration object.
 */
function swiftUIGenerator(
  svgAST: RootNode,
  config?: SwiftUIGeneratorConfig
): string {
  const generatedBody = '';

  const fullSwiftUIShape = generateSwiftUIShape(
    config?.structName || 'MyCustomShape',
    generatedBody
  );

  console.log(format(fullSwiftUIShape));

  return fullSwiftUIShape;
}
