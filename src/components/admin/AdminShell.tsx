import Link from "next/link";
import { adminLogoutAction } from "@/app/actions/admin";

interface AdminShellProps {
  currentPath:
    | "/admin"
    | "/admin/reservations"
    | "/admin/operations"
    | "/admin/calendar"
    | "/admin/reports";
  title: string;
  description: string;
  children: React.ReactNode;
}

const navItems: Array<{
  href: AdminShellProps["currentPath"];
  label: string;
}> = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/reservations", label: "Reservations" },
  { href: "/admin/calendar", label: "Calendar" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/operations", label: "Operations" },
];

export function AdminShell({
  currentPath,
  title,
  description,
  children,
}: AdminShellProps) {
  return (
    <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              MerrySails Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--heading)]">
              {title}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              {description}
            </p>
          </div>

          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {navItems.map((item) => {
            const active = currentPath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? "bg-[var(--brand-primary)] text-white shadow-sm"
                    : "border border-[var(--line)] bg-white text-[var(--heading)] hover:border-[var(--brand-primary)]/30"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {children}
      </div>
    </main>
  );
}
