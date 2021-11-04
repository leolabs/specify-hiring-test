import { Parser } from "..";
import { colorToRgba } from "../../color";
import { ColorToken } from "../../schemas/colorToken";
import { indentLines, kebapCase } from "../../strings";

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
export const scss: Parser = (input) => {
  return [
    `@use "sass:map";`,
    ``,
    createColorMap(input),
    ``,
    COLOR_FUNCTION,
  ].join("\n");
};
