import type { Metadata } from "next";
import { format } from "date-fns";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin Leads",
  robots: { index: false, follow: false },
};

function cleanPhone(phone?: string | null) {
  return phone?.replace(/[^\d+]/g, "") || "";
}

function getStatusClass(status: string) {
  switch (status) {
    case "booked":
      return "bg-emerald-50 text-emerald-800";
    case "qualified":
      return "bg-sky-50 text-sky-800";
    case "bad":
      return "bg-rose-50 text-rose-800";
    case "contacted":
      return "bg-amber-50 text-amber-800";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default async function AdminLeadsPage() {
  await requireAdminSession();

  const leads = await prisma.googleAdsLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const newCount = leads.filter((lead) => lead.status === "new").length;
  const qualifiedCount = leads.filter((lead) =>
    ["qualified", "booked"].includes(lead.status)
  ).length;
  const phoneCount = leads.filter((lead) => Boolean(lead.phone)).length;

  return (
    <AdminShell
      currentPath="/admin/leads"
      title="Google Ads leads"
      description="Google-hosted lead form submissions from Sunset, Dinner, and controlled PMax campaigns."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Latest leads", value: leads.length },
          { label: "New", value: newCount },
          { label: "With phone", value: phoneCount },
          { label: "Qualified/booked", value: qualifiedCount },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-[2rem] border border-[var(--line)] bg-white p-5 shadow-sm"
          >
            <div className="text-sm text-[var(--text-muted)]">{card.label}</div>
            <div className="mt-2 text-3xl font-bold text-[var(--heading)]">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--heading)]">
              Recent lead form submissions
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Call fast. These are low-friction ad leads, so speed matters more than polish.
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[var(--line)]">
          {leads.length === 0 ? (
            <div className="bg-[var(--surface-alt)] p-8 text-sm text-[var(--text-muted)]">
              No Google Ads lead form submissions yet.
            </div>
          ) : (
            <div className="divide-y divide-[var(--line)]">
              {leads.map((lead) => {
                const phone = cleanPhone(lead.phone);
                const whatsappPhone = phone.replace(/[^\d]/g, "");

                return (
                  <article key={lead.id} className="bg-white p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-primary)]">
                            {lead.product || "MerrySails"}
                          </span>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${getStatusClass(lead.status)}`}>
                            {lead.status}
                          </span>
                          {lead.isTest ? (
                            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-purple-800">
                              Test
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-[var(--heading)]">
                          {lead.name || "Name not provided"}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {lead.campaignName || "Unknown campaign"}
                        </p>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                          {format(lead.createdAt, "dd MMM yyyy HH:mm")}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {phone ? (
                          <>
                            <a
                              href={`tel:${phone}`}
                              className="rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                            >
                              Call
                            </a>
                            <a
                              href={`https://wa.me/${whatsappPhone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]"
                            >
                              WhatsApp
                            </a>
                          </>
                        ) : (
                          <span className="rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-800">
                            No phone
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
