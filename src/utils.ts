import {select} from 'hast-util-select';
import {ElementNode, RootNode} from 'svg-parser';
import {SVGElementProperties} from './types';

/**
 * Converts number with unit suffix to pixels.
 * @param number Number with the unit as a string.
 */
export function convertToPixels(num: string | number) {
  // If number is provided, just return that number.
  if (typeof num === 'number') return num;

  // If the value is a string, handle the conversion.
  const unit = String(num).substr(-2, 2);
  if (unit.search(/^[a-z]{2}$/i) !== -1) {
    switch (unit) {
      case 'em':
        // TODO: Convert correctly from em.
        return parseFloat(num);
      case 'ex':
        // TODO: Convert correctly from ex.
        return parseFloat(num);
      case 'px':
        return parseFloat(num);
      case 'pt':
        // TODO: Convert correctly from pt.
        return parseFloat(num);
      case 'pc':
        // TODO: Convert correctly from pc.
        return parseFloat(num);
      case 'cm':
        // TODO: Convert correctly from cm.
        return parseFloat(num);
      case 'mm':
        // TODO: Convert correctly from mm.
        return parseFloat(num);
      case 'in':
        // TODO: Convert correctly from in.
        return parseFloat(num);
      default:
        return parseFloat(num);
    }
  } else {
    return parseFloat(num);
  }
}

/**
 * Extracts properties of the <svg> node.
 * @param svgJsonTree
 */
export function extractSVGProperties(
  svgJsonTree: RootNode
): SVGElementProperties {
  // Find the SVG element.
  const svg = select('svg', svgJsonTree) as ElementNode;

  // Extract needed properties.
  const viewBox = svg.properties?.viewBox;
  const width = svg.properties?.width;
  const height = svg.properties?.height;

  // Throw if required properties are not provided.
  if (!width || !height) {
    throw new Error('Width and height must be provided on <svg> element!');
  }

  // Parse width and height with units.
  const widthUnit = convertToPixels(width);
  const heightUnit = convertToPixels(height);

  // Validiate and parse view box.
  const viewBoxElements = String(viewBox)
    .split(' ')
    .map(n => parseFloat(n));
  const [vbx, vby, vbWidth, vbHeight] = viewBoxElements;
  const viewBoxValid = viewBoxElements.every(value => !isNaN(value));

  return {
    width: widthUnit,
    height: heightUnit,
    viewBox: viewBoxValid
      ? {x: vbx, y: vby, width: vbWidth, height: vbHeight} // If view box is provided, use this.
      : {x: 0, y: 0, width: widthUnit, height: heightUnit}, // Otherwise use width and height.
  };
}
