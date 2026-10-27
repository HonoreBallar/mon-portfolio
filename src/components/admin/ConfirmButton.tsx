"use client";

import type { ReactNode } from "react";
import { dangerButton } from "./styles";

/** Submits a server action after a browser confirmation */
export default function ConfirmButton({
  action,
  message,
  children,
  className = dangerButton,
}: {
  action: () => Promise<void>;
  message: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
