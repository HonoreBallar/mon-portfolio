"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Field } from "@/lib/admin/resources";
import type { FormState } from "@/lib/admin/validation";
import { input, primaryButton, secondaryButton } from "./styles";

export type FormValues = Record<string, string | boolean>;

function FieldInput({ field, value }: { field: Field; value: string | boolean | undefined }) {
  const common = { id: field.name, name: field.name, required: field.required, maxLength: field.max };

  switch (field.type) {
    case "textarea":
      return <textarea {...common} rows={5} defaultValue={String(value ?? "")} className={`${input} resize-y`} />;
    case "checkbox":
      return (
        <input
          id={field.name}
          name={field.name}
          type="checkbox"
          defaultChecked={value === true || value === "on"}
          className="h-5 w-5 accent-cyan"
        />
      );
    case "select":
      return (
        <select {...common} defaultValue={String(value ?? field.options?.[0] ?? "")} className={input}>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case "color":
      return (
        <input
          {...common}
          type="color"
          defaultValue={String(value || "#22d3ee")}
          className="h-11 w-16 cursor-pointer rounded-[10px] border border-white/[0.08] bg-[#06070d] p-1"
        />
      );
    case "number":
      return <input {...common} type="number" step={1} defaultValue={String(value ?? 0)} className={`${input} max-w-[140px]`} />;
    default:
      return <input {...common} type="text" defaultValue={String(value ?? "")} className={input} />;
  }
}

export default function ResourceForm({
  fields,
  initial,
  action,
  cancelHref,
  submitLabel = "Enregistrer",
}: {
  fields: Field[];
  initial: FormValues;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  cancelHref?: string;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  // After a failed submit, show what was typed rather than the initial values
  const values: FormValues = state?.values && !state.saved ? { ...initial, ...state.values } : initial;

  return (
    // Two columns on wide screens; long texts keep the full width
    <form action={formAction} className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={`flex flex-col gap-2 ${f.type === "textarea" ? "lg:col-span-2" : ""}`}>
          <label htmlFor={f.name} className="text-[14px] font-medium text-[#c3c8d6]">
            {f.label}
            {f.required && <span className="text-cyan"> *</span>}
          </label>
          <FieldInput field={f} value={values[f.name]} />
          {f.help && <p className="text-[13px] text-dim">{f.help}</p>}
          {state?.errors?.[f.name] && (
            <p role="alert" className="text-[13px] text-[#f87171]">
              {state.errors[f.name]}
            </p>
          )}
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-3 pt-2 lg:col-span-2">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? "Enregistrement…" : submitLabel}
        </button>
        {cancelHref && (
          <Link href={cancelHref} className={secondaryButton}>
            Annuler
          </Link>
        )}
        {state?.saved && <p className="text-[14px] text-green">Enregistré ✓</p>}
      </div>
    </form>
  );
}
