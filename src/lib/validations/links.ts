import { z } from "zod";

const slugRegex = /^[a-zA-Z0-9-]+$/;

function emptyStringToUndefined(value: unknown) {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
}

export const createLinkSchema = z.object({
  destinationUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .refine(
      (value) => {
        try {
          const url = new URL(value);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      },
      {
        message: "URL must start with http:// or https://.",
      },
    ),

  slug: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .min(1, "Slug cannot be empty.")
      .max(64, "Slug must be 64 characters or less.")
      .regex(
        slugRegex,
        "Slug can only contain letters, numbers, and dashes.",
      )
      .optional(),
  ),

  title: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .max(120, "Title must be 120 characters or less.")
      .optional(),
  ),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;