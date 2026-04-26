import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  Gauge,
  Inbox,
  ShipWheel,
  type LucideIcon,
} from "lucide-react";
import { adminLogoutAction } from "@/app/actions/admin";

interface AdminShellProps {
  currentPath:
    | "/admin"
    | "/admin/leads"
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
  Icon: LucideIcon;
}> = [
  { href: "/admin", label: "Dashboard", Icon: Gauge },
  { href: "/admin/leads", label: "Leads", Icon: Inbox },
  { href: "/admin/reservations", label: "Reservations", Icon: ClipboardList },
  { href: "/admin/calendar", label: "Calendar", Icon: CalendarDays },
  { href: "/admin/reports", label: "Reports", Icon: BarChart3 },
  { href: "/admin/operations", label: "Operations", Icon: ShipWheel },
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
            const { Icon } = item;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? "bg-[var(--brand-primary)] !text-white shadow-sm"
                    : "border border-[var(--line)] bg-white text-[var(--heading)] hover:border-[var(--brand-primary)]/30"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
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
