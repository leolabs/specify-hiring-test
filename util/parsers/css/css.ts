import { Parser } from "..";
import { colorToRgba } from "../../color";
import { indentLines, kebapCase } from "../../strings";

/** Converts a given array of ColorTokens into CSS variables. */
export const css: Parser = (input) => {
  const colorVariables = input.map(({ name, value }) =>
    [`/* ${name} */`, `--${kebapCase(name)}: ${colorToRgba(value)};`].join("\n")
  );

  const css = indentLines(colorVariables.join("\n\n"));
  return `:root {\n${indentLines(css)}\n}`;
};
