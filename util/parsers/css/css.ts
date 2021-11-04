import { Parser, ParserFunction } from "..";
import { colorToRgba } from "../../color";
import { indentLines, kebapCase } from "../../strings";

// Example of a CSS file:
//
// :root {
//   /* Colors/Accent */
//   --colors-accent: rgba(87, 124, 254, 1);
//
//   /* Colors/Black */
//   --colors-black: rgba(30, 33, 43, 1);
// });

/** Converts a given array of ColorTokens into CSS variables. */
export const parseToCss: ParserFunction = (input) => {
  const colorVariables = input.map(({ name, value }) =>
    [`/* ${name} */`, `--${kebapCase(name)}: ${colorToRgba(value)};`].join("\n")
  );

  const css = indentLines(colorVariables.join("\n\n"));
  return `:root {\n${indentLines(css)}\n}`;
};

export const css: Parser = {
  name: "CSS",
  language: "css",
  mimeType: "text/css",
  fileName: "colorTokens.css",
  parse: parseToCss,
};
