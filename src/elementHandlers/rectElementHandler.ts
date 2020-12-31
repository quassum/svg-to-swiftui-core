import {ElementNode} from 'svg-parser';
import {extractStyle} from '../styleUtils';
import {TranspilerOptions} from '../types';

export default function handleRectElement(
  element: ElementNode,
  options: TranspilerOptions
): string[] {
  const style = extractStyle(element);

  return ['\nRectange element is not supported!\n'];
}
