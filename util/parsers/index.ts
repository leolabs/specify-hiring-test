import { ColorToken } from "../schemas/colorToken";
import { css } from "./css/css";
import { jss } from "./jss/jss";
import { scss } from "./scss/scss";

/**
 * A parser converts an array of color tokens into a string
 */
export type ParserFunction = (input: ColorToken[]) => string;

export interface Parser {
  name: string;
  mimeType: string;
  fileName: string;
  parser: ParserFunction;
}

export const parsers: Record<string, Parser> = {
  css,
  scss,
  jss,
};
