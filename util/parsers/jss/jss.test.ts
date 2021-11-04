import { colorTokens } from "../mock-data/colorTokens";
import { parseToJss } from "./jss";

describe("JSS parser", () => {
  it("should convert a single token to the correct JSS string", () => {
    const result = [
      `export const colors = {`,
      `  /* Colors/Accent */`,
      `  accent: "rgba(87, 124, 254, 1)"`,
      `};`,
    ].join("\n");

    expect(parseToJss([colorTokens[0]])).toBe(result);
  });

  it("should convert multiple tokens to the correct JSS string", () => {
    const result = [
      `export const colors = {`,
      `  /* Colors/Accent */`,
      `  accent: "rgba(87, 124, 254, 1)",`,
      `  `,
      `  /* Colors/Black */`,
      `  black: "rgba(30, 33, 43, 1)"`,
      `};`,
    ].join("\n");

    expect(parseToJss([colorTokens[0], colorTokens[1]])).toBe(result);
  });
});
