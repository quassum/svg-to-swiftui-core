import {ElementNode} from 'svg-parser';
import {extractStyle} from '../styleUtils';
import {TranspilerOptions} from '../types';

export default function handleCircleElement(
  element: ElementNode,
  options: TranspilerOptions
): string {
  const style = extractStyle(element);

  return '\nCirrcle element is unsuupported\n';
}
