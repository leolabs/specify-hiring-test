import { ColorToken } from "../schemas/color-token";
import { css } from "./css/css";
import { jss } from "./jss/jss";
import { scss } from "./scss/scss";

/**
 * A parser converts an array of color tokens into a string
 */
export type ParserFunction = (input: ColorToken[]) => string;

export interface Parser {
  name: string;
  language: string;
  mimeType: string;
  fileName: string;
  parse: ParserFunction;
}

export const parsers: Record<string, Parser> = {
  css,
  scss,
  jss,
};
