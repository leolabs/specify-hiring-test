import * as yup from "yup";

/** An integer value from 0 to 255 */
export const yupByte = yup.number().integer().min(0).max(255);

/** A float value from 0 to 1 */
export const yupFloat = yup.number().min(0).max(1);

/**
 * Validates only the keys that are present on a given object.
 * This is useful for validating PATCH requests with partial updates.
 */
export const validatePartialSchema = (
  schema: yup.AnyObjectSchema,
  data: any
) => {
  for (const key in data) {
    schema.validateSyncAt(key, data);
  }
};
