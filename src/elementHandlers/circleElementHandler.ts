import {ElementNode} from 'svg-parser';
import {extractProps} from '../styleUtils';
import {TranspilerOptions} from '../types';

export default function handleCircleElement(
  element: ElementNode,
  options: TranspilerOptions
) {
  const {properties, children, style} = extractProps(element, options);
}
