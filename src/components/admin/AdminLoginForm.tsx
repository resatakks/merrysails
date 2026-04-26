"use client";

import { useActionState } from "react";
import { adminLoginAction } from "@/app/actions/admin";

const initialState = {
  success: false,
  error: "",
};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLoginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="admin-email"
          className="block text-sm font-medium text-[var(--heading)]"
        >
          Admin email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1.5 w-full rounded-2xl border border-[var(--line)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          placeholder="info@merrysails.com"
        />
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="block text-sm font-medium text-[var(--heading)]"
        >
          Admin password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-2xl border border-[var(--line)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
          placeholder="Enter admin password"
        />
      </div>

      {state.error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 py-3 font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Checking..." : "Sign in"}
      </button>
    </form>
  );
}
