import type { Metadata } from "next";
import { card } from "@/components/admin/styles";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Connexion — Admin", robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className={`${card} w-full max-w-[400px] p-8`}>
        <p className="font-mono text-[13px] text-cyan">~/admin</p>
        <h1 className="mt-2 text-[26px] font-bold tracking-tight text-text">Connexion</h1>
        <div className="mt-7">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
