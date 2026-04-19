import type { Metadata } from "next";
import { isAdminAuthConfigured, isAdminDevBypassEnabled } from "@/lib/admin-auth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  const devBypass = isAdminDevBypassEnabled();
  const configured = isAdminAuthConfigured();

  return (
    <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-20">
      <div className="mx-auto max-w-lg px-4">
        <div className="rounded-[2rem] border border-[var(--line)] bg-white p-8 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
            MerrySails Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--heading)]">
            Admin access
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            Use this login only for reservation operations, status updates, and
            live availability control of the 3 core products.
          </p>

          {devBypass ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
              Development bypass is active because admin credentials are not set
              yet. In production, set `ADMIN_ACCESS_PASSWORD` and
              `ADMIN_SESSION_SECRET`.
            </div>
          ) : configured ? (
            <div className="mt-6">
              <AdminLoginForm />
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
              Admin access is not configured yet. Add
              `ADMIN_ACCESS_PASSWORD` and `ADMIN_SESSION_SECRET` to enable
              secure login.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
