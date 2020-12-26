import {ElementNode} from 'svg-parser';
import {TranspilerOptions} from '../types';

export function handleElement(
  element: ElementNode,
  options: TranspilerOptions
) {
  switch (element.tagName) {
    case 'g':
      return handleGroupElement(element, options);

    case 'path':
      return handlePathElement(element, options);

    case 'circle':
      return handleCircleElement(element, options);

    case 'rect':
      return handleRectElement(element, options);
  }
}
