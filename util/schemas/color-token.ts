import * as yup from "yup";
import { ColorToken as DbColorToken } from "@prisma/client";

import { Color, colorSchema } from "./color";
import { yupByte, yupFloat } from "./helpers";

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

/** A schema for colorToken objects that are stored in the database */
export const dbColorTokenSchema = yup.object().shape({
  name: yup.string().required(),
  colorRed: yupByte.required(),
  colorGreen: yupByte.required(),
  colorBlue: yupByte.required(),
  colorAlpha: yupFloat.required(),
  meta: yup.object(),
});

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

export const colorTokenToDb = (
  colorToken: ColorToken
): Partial<DbColorToken> => {
  colorTokenSchema.validateSync(colorToken);
  const { name, value, meta } = colorToken;
  return {
    name,
    colorRed: value.r,
    colorGreen: value.g,
    colorBlue: value.b,
    colorAlpha: value.a,
    meta: meta ?? undefined,
  };
};
