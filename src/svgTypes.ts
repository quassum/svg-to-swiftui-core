interface SVGBaseAttributes {
  id?: string;
  class?: string;
  style?: string;
}

export interface SVGPathAttributes extends SVGBaseAttributes {
  d?: string;
  pathLength?: string;
}

export interface SVGCircleAttributes extends SVGBaseAttributes {
  cx?: string;
  cy?: string;
  r?: string;
  pathLength?: string;
}
