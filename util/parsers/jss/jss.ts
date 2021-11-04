import { Parser, ParserFunction } from "..";
import { colorToRgba } from "../../color";
import { camelCase, indentLines, uncapitalize } from "../../strings";

// Example of a JSS file:
//
// export const colors = {
//   /* Colors/Accent */
//   accent: "rgba(87, 124, 254, 1)",
//
//   /* Colors/Black */
//   black: "rgba(30, 33, 43, 1)"
// };

/**
 * Converts a given array of ColorTokens into
 * a JS object that can be used e.g. with JSS.
 */
export const parseToJss: ParserFunction = (input) => {
  const colorLines = input.map(({ name, value }) => {
    const colorName = camelCase(name).replace("colors", "");
    return [
      `/* ${name} */`,
      `${uncapitalize(colorName)}: "${colorToRgba(value)}"`,
    ].join("\n");
  });

  return [
    "export const colors = {",
    indentLines(colorLines.join(",\n\n")),
    "};",
  ].join("\n");
};

export const jss: Parser = {
  name: "JSS",
  language: "js",
  mimeType: "application/javascript",
  fileName: "colorTokens.js",
  parse: parseToJss,
};
