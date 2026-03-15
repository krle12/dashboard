"use client";

import { useActionState } from "react";
import { login } from "@/src/actions/auth";
import { Input } from "@/src/components/input/Input";
import { SubmitButton } from "@/src/components/button/SubmitButton";

export function LoginForm() {
  const [state, formAction] = useActionState(login, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-2 rounded-md text-sm">
          {state.error}
        </div>
      )}

      <Input
        label="Email adresa"
        id="email"
        type="email"
        name="email"
        required
      />

      <Input
        label="Lozinka"
        id="password"
        type="password"
        name="password"
        required
      />

      <div className="mt-4">
        <SubmitButton
          defaultText="Prijavi se"
          loadingText="Prijavljivanje u toku..."
        />
      </div>
    </form>
  );
}
