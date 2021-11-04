import { Parser, ParserFunction } from "..";
import { colorToRgba } from "../../color";
import { ColorToken } from "../../schemas/color-token";
import { indentLines, kebapCase } from "../../strings";

// Example of an SCSS file:
//
// @use "scss:map";
//
// $colors: (
//   /* Colors/Accent */
//   accent: rgba(87, 124, 254, 1),
//
//   /* Colors/Black */
//   black: rgba(30, 33, 43, 1)
// );
//
// @function get-color($name) {
//   @if map-has-key($colors, $name) {
//     @return map-get($colors, $name);
//   } @else {
//     @error "There is no \`#{$name}\` color";
//   }
// }

// TODO for better DX: Use template strings with `common-tags` instead
// of concatenating strings in an array.
/** SCSS function that can be used to easily access a given color */
const COLOR_FUNCTION = [
  `@function get-color($name) {`,
  `  @if map-has-key($colors, $name) {`,
  `    @return map-get($colors, $name);`,
  `  } @else {`,
  `    @error "There is no \`#{$name}\` color";`,
  `  }`,
  `}`,
].join("\n");

/** Converts an array of ColorTokens into an SCSS map. */
export const createColorMap = (colors: ColorToken[], name = "colors") => {
  const colorLines = colors.map(({ name, value }) => {
    const colorName = kebapCase(name).replace("colors-", "");
    return [`/* ${name} */`, `${colorName}: ${colorToRgba(value)}`].join("\n");
  });

  return [`$${name}: (`, indentLines(colorLines.join(",\n\n"), 2), `);`].join(
    "\n"
  );
};

/** Converts a given array of ColorTokens into an SCSS map of colors. */
export const parseToScss: ParserFunction = (input) => {
  return [
    `@use "sass:map";`,
    ``,
    createColorMap(input),
    ``,
    COLOR_FUNCTION,
  ].join("\n");
};

export const scss: Parser = {
  name: "SCSS",
  language: "scss",
  mimeType: "text/scss",
  fileName: "colorTokens.scss",
  parse: parseToScss,
};
