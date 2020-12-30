import {ElementNode, RootNode, TextNode} from 'svg-parser';
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
export function extractSVGProperties(svg: ElementNode): SVGElementProperties {
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

/**
 * Performs Breadth First Search (BFS) to find <svg> element
 * @param rootNode Root node of given by SVG Parser
 */
export function getSVGElement(rootNode: RootNode): ElementNode | undefined {
  const frontier: (RootNode | ElementNode | TextNode | string)[] = [rootNode];

  // Run while there are nodes in the frontier
  while (frontier.length > 0) {
    // Get the first node so there is a FIFO queue.
    const currentNode = frontier.shift();

    // Ignore undefined and string nodes.
    if (currentNode && typeof currentNode !== 'string') {
      if (currentNode.type === 'root') {
        // Only need children from the root node, so add them
        // to frontier and continue.
        frontier.push(...currentNode.children);
        continue;
      } else if (currentNode.type === 'element') {
        // If the element node is the svg element, return it.
        if (currentNode.tagName === 'svg') return currentNode;

        // Otherwise push children to the frontier and continue.
        frontier.push(...currentNode.children);
        continue;
      } else {
        continue;
      }
    }
  }

  return undefined;
}

/**
 * This function is used to cleanup expression like this: `0.5*width`.
 * If the expression is `1*width` there is no reason to multiply it by
 * 1, so we can just leave `width`. If the expression is `0*width`
 * then there is no reason to keep `width` around, so it just becomes
 * `0`.
 * @param value Numberic value.
 * @param suffix Variable suffix that is appended to the end (width,
 * height, etc.)
 */
export function clampNormalisedSizeProduct(
  value: number,
  suffix: string
): string {
  if (value === 1) {
    return suffix;
  } else if (value === 0) {
    return '0';
  } else {
    return `${value}*${suffix}`;
  }
}
