import { Parser } from "..";
import { indentLines, kebapCase } from "../../strings";

/** Converts a given array of ColorTokens into CSS variables. */
export const css: Parser = (input) => {
  const colorVariables = input.map(({ name, value }) => {
    const kebapName = kebapCase(name);
    return [
      `/* ${name} */`,
      `--${kebapName}: rgba(${value.r}, ${value.g}, ${value.b}, ${value.a});`,
    ].join("\n");
  });

  const css = indentLines(colorVariables.join("\n\n"));
  return `:root {\n${indentLines(css)}\n}`;
};
