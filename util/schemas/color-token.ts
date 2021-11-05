import * as yup from "yup";
import { ColorToken as DbColorToken } from "@prisma/client";

import { Color, colorSchema } from "./color";

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

/** A schema for spec-compliant colorToken objects */
export const colorTokenSchema = yup.object().shape({
  name: yup.string().required(),
  value: colorSchema.required(),
  meta: yup.object(),
});

/**
 * Converts the schema of a color token stored in the db into a spec-compliant object
 */
export const dbToColorToken = (dbColorToken: DbColorToken): ColorToken => ({
  name: dbColorToken.name,
  value: dbColorToken.value as any,
  meta: (dbColorToken.meta as any) ?? undefined,
});
