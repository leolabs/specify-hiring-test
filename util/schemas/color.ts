import yup from "yup";
import { yupByte, yupFloat } from "./helpers";

/** A single RGBA color vector */
export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const colorSchema = yup.object().shape({
  r: yupByte.required(),
  g: yupByte.required(),
  b: yupByte.required(),
  a: yupFloat.required(),
});

/**
 * Converts a given color to an rgba string
 * that can be used in (S)CSS or JSS.
 */
export const colorToRgba = ({ r, g, b, a }: Color) =>
  `rgba(${r}, ${g}, ${b}, ${a})`;
