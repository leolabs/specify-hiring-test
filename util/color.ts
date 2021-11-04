/** A single RGBA color vector */
export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Converts a given color to an rgba string
 * that can be used in (S)CSS or JSS.
 */
export const colorToRgba = ({ r, g, b, a }: Color) =>
  `rgba(${r}, ${g}, ${b}, ${a})`;
