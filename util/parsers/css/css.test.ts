import { colorTokens } from "../mock-data/colorTokens";
import { parseToCss } from "./css";

describe("CSS parser", () => {
  it("should convert a single token to the correct CSS string", () => {
    const result = [
      ":root {",
      "  /* Colors/Accent */",
      "  --colors-accent: rgba(87, 124, 254, 1);",
      "}",
    ].join("\n");

    expect(parseToCss([colorTokens[0]])).toBe(result);
  });

  it("should convert multiple tokens to the correct CSS string", () => {
    const result = [
      ":root {",
      "  /* Colors/Accent */",
      "  --colors-accent: rgba(87, 124, 254, 1);",
      "  ",
      "  /* Colors/Black */",
      "  --colors-black: rgba(30, 33, 43, 1);",
      "}",
    ].join("\n");

    expect(parseToCss([colorTokens[0], colorTokens[1]])).toBe(result);
  });
});
