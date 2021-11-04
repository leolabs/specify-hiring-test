import { colorTokens } from "../mock-data/colorTokens";
import { createColorMap } from "./scss";

describe("SCSS parser", () => {
  it("should convert a single token to the correct SCSS string", () => {
    const result = [
      "$colors: (",
      "  /* Colors/Accent */",
      "  accent: rgba(87, 124, 254, 1)",
      ");",
    ].join("\n");

    expect(createColorMap([colorTokens[0]])).toBe(result);
  });

  it("should convert multiple tokens to the correct SCSS string", () => {
    const result = [
      "$colors: (",
      "  /* Colors/Accent */",
      "  accent: rgba(87, 124, 254, 1),",
      "  ",
      "  /* Colors/Black */",
      "  black: rgba(30, 33, 43, 1)",
      ");",
    ].join("\n");

    expect(createColorMap([colorTokens[0], colorTokens[1]])).toBe(result);
  });
});
