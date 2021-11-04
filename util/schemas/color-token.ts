import { ColorToken as DbColorToken } from ".prisma/client";
import { Color } from "../color";

/**
 * A single, spec-compliant color token.
 *
 * Example:
 * ```
 * {
 *   "name": "Colors/Accent",
 *   "value": {
 *     "a": 1,
 *     "b": 254,
 *     "g": 124,
 *     "r": 87
 *   },
 *   "meta": {
 *     "source": "localStyles"
 *   }
 * }
 * ```
 */
export interface ColorToken {
  name: string;
  value: Color;
  meta?: Record<string, any>;
}

/**
 * Converts the schema of a color token stored in the db into a spec-compliant object
 */
export const dbToColorToken = (dbColorToken: DbColorToken): ColorToken => ({
  name: dbColorToken.name,
  value: {
    r: dbColorToken.colorRed,
    g: dbColorToken.colorGreen,
    b: dbColorToken.colorBlue,
    a: dbColorToken.colorAlpha,
  },
  meta: (dbColorToken.meta as any) ?? undefined,
});
