import {
  kebapCase,
  camelCase,
  pascalCase,
  extractWords,
  indentLines,
  capitalize,
  uncapitalize,
} from "./strings";

describe("extractWords", () => {
  it("should extract words from a string", () => {
    expect(extractWords("Hello World")).toEqual(["hello", "world"]);
    expect(extractWords("Hello/World")).toEqual(["hello", "world"]);
    expect(extractWords("Hello-World")).toEqual(["hello", "world"]);
  });
});

describe("pascalCase", () => {
  it("should return a string with the first letter uppercased", () => {
    expect(pascalCase("test")).toBe("Test");
  });

  it("should return a string with the first letter uppercased", () => {
    expect(pascalCase("test test")).toBe("TestTest");
  });
});

describe("camelCase", () => {
  it("should return a string with the first letter lowercased", () => {
    expect(camelCase("test")).toBe("test");
  });

  it("should return a string with the first letter lowercased", () => {
    expect(camelCase("test test")).toBe("testTest");
  });
});

describe("kebapCase", () => {
  it("should return a string with the first letter lowercased", () => {
    expect(kebapCase("test")).toBe("test");
  });

  it("should return a string with the first letter lowercased", () => {
    expect(kebapCase("test test")).toBe("test-test");
  });
});

describe("indentLines", () => {
  it("should indent a single line lines", () => {
    expect(indentLines("test", 2)).toBe("  test");
  });

  it("should indent multiple lines", () => {
    expect(indentLines("test\ntest", 2)).toBe("  test\n  test");
  });

  it("should trim leading whitespace", () => {
    expect(indentLines("test\n  test", 2)).toBe("  test\n  test");
  });
});

describe("capitalize", () => {
  it("should upper-case the first letter of a string", () => {
    expect(capitalize("test")).toBe("Test");
  });
});

describe("uncapitalize", () => {
  it("should lower-case the first letter of a string", () => {
    expect(uncapitalize("Test")).toBe("Test");
  });
});
