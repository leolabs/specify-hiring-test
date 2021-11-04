/**
 * Extracts an array of words from a given string,
 * trimming whitespace and removing empty strings.
 *
 * @example `"Colors/Accent "` -> `["colors", "accent"]`
 */
export const extractWords = (str: string) =>
  str
    .split(/[-_\s\/]/)
    .map((s) => s.toLowerCase().trim())
    .filter(Boolean);

/** Capitalizes the first letter of a string */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/** Lower-cases the first letter of a string */
export const uncapitalize = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);

/** Converts a string to PascalCase */
export const pascalCase = (str: string) =>
  extractWords(str).map(capitalize).join("");

/** Converts a string to camelCase */
export const camelCase = (str: string) =>
  extractWords(str)
    .map((w, i) => (i > 0 ? capitalize(w) : w))
    .join("");

/** Converts a string to kebap-case */
export const kebapCase = (str: string) => extractWords(str).join("-");

/** Indents all lines of a string to a given indentation level */
export const indentLines = (str: string, indentation = 2) =>
  str
    .split("\n")
    .map((s) => " ".repeat(indentation) + s.trimStart())
    .join("\n");
