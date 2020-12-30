export interface SwiftUIGeneratorConfig {
  structName?: string;
  decimalPoints?: number;
  indentationSize?: number;
}

export interface TranspilerOptions {
  width: number;
  height: number;
  viewBox: ViewBoxData;
  precision: number;
  lastPathId: number;
  currentIndentationLevel: number;
}

export interface ViewBoxData {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Element Property Interfaces

export interface SVGElementProperties {
  width: number;
  height: number;
  viewBox: ViewBoxData;
}
