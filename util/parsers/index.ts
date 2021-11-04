import { ColorToken } from "../schemas/colorToken";

/**
 * A parser converts an array of color tokens into a string
 */
export type Parser = (input: ColorToken[]) => string;
