import { z } from "zod";
import type { Field } from "./resources";

const COLOR = /^#[0-9a-fA-F]{6}$/;

function fieldSchema(field: Field): z.ZodType {
  switch (field.type) {
    case "number":
      return z.coerce.number().int().default(0);
    case "checkbox":
      return z.preprocess((v) => v === "on", z.boolean());
    case "tags":
      return z.preprocess(
        (v) => String(v ?? "").split(",").map((t) => t.trim()).filter(Boolean),
        z.array(z.string().max(100)),
      );
    case "color":
      return z.string().trim().regex(COLOR, "Couleur au format #RRGGBB");
    case "select":
      return z.enum(field.options as [string, ...string[]], "Choix invalide");
    case "url": {
      const url = z
        .string()
        .trim()
        .max(255)
        .refine((v) => v === "#" || /^(https?:\/\/|mailto:)/.test(v), "Doit commencer par https://, http:// ou mailto:");
      // An empty optional link is stored as "#", which hides it on the site
      return field.required ? url : z.string().trim().transform((v) => v || "#").pipe(url);
    }
    default: {
      let s = z.string().trim();
      if (field.required) s = s.min(1, "Champ obligatoire");
      if (field.max) s = s.max(field.max, `${field.max} caractères maximum`);
      return s;
    }
  }
}

export type FormState = { errors?: Record<string, string>; values?: Record<string, string>; saved?: boolean } | undefined;

/** Validates a submitted admin form against the field definitions */
export function parseForm(fields: Field[], formData: FormData) {
  const schema = z.object(Object.fromEntries(fields.map((f) => [f.name, fieldSchema(f)])));
  const raw = Object.fromEntries(fields.map((f) => [f.name, formData.get(f.name) ?? undefined]));
  const result = schema.safeParse(raw);
  if (result.success) return { data: result.data as Record<string, unknown> };

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0]);
    errors[key] ??= issue.message;
  }
  const values = Object.fromEntries(fields.map((f) => [f.name, String(formData.get(f.name) ?? "")]));
  return { state: { errors, values } satisfies FormState };
}
