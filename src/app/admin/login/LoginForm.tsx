"use client";

import { useActionState } from "react";
import { input, primaryButton } from "@/components/admin/styles";
import { login } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px] font-medium text-[#c3c8d6]">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" defaultValue={state?.email} className={input} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[14px] font-medium text-[#c3c8d6]">Mot de passe</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={input} />
      </div>
      {state?.error && (
        <p role="alert" className="text-[14px] text-[#f87171]">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
