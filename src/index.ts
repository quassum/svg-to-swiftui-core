import {ElementNode, parse} from 'svg-parser';
import {generateSwiftUIShape} from './stubs';
import {SwiftUIGeneratorConfig} from './types';

import {handleElement} from './elementHandlers';
import {extractSVGProperties, getSVGElement} from './utils';

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
  const AST = parse(rawSVGString);
  const svgElement = getSVGElement(AST);
  if (svgElement) {
    return swiftUIGenerator(svgElement, config);
  } else {
    throw new Error(
      'Could not find SVG element, please provide full SVG source!'
    );
  }
}

/**
 * Generates SwiftUI Shape string from SVG HAST (Abstract Syntax Tree).
 * @param svgElement Parsed SVG Abstract Syntax Tree.
 * @param config Optional configuration object.
 */
function swiftUIGenerator(
  svgElement: ElementNode,
  config?: SwiftUIGeneratorConfig
): string {
  const svgProperties = extractSVGProperties(svgElement);
  const rootTranspilerOptions = {
    ...svgProperties,
    precision: config?.decimalPoints || 10,
    lastPathId: 0,
    currentIndentationLevel: 0,
  };

  const generatedBody = handleElement(svgElement, rootTranspilerOptions);

  const fullSwiftUIShape = generateSwiftUIShape(
    config?.structName || 'MyCustomShape',
    generatedBody
  );

  return fullSwiftUIShape;
}
