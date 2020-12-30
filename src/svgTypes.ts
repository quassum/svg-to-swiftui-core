interface SVGBaseAttributes {
  id?: string;
  class?: string;
  style?: string;
}

export interface SVGPathAttributes extends SVGBaseAttributes {
  d: string;
  pathLength: string;
}
