import {ElementNode, RootNode} from 'svg-parser';
import {extractStyle} from '../styleUtils';
import {TranspilerOptions} from '../types';
import {handleElement} from './index';

// Handles 'g' svg element, returns generated swift string.
/**
 * Transforms SVG group element into SwiftUI Shape by
 * accumulating subcomands of the children.
 * @param element Group element node
 * @param options Transpiler options
 */
export default function handleGroupElement(
  element: ElementNode | RootNode,
  options: TranspilerOptions
): string {
  const {children} = element;
  const style = element.type === 'element' ? extractStyle(element) : {};

  console.log(element);

  // For each child run the generator, accumulate swift string and return it.
  let acc = '';
  for (const child of children) {
    // TODO: Handle string children properly.
    if (typeof child === 'string') continue;

    // TODO: Handle TextNode children properly.
    if (child.type === 'text') continue;

    console.log(child.tagName);

    // Append result to the accumulator.
    acc += handleElement(child, {
      ...options,
      ...style,
    });

    // Add new line
    acc += '\n';
  }
  return acc;
}
