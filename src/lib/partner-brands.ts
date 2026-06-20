// Partner Brands — cross-DB read/manage of SISTER brand reservations.
//
// MerrySails' admin gets a unified view of two sibling brands' bookings that
// live in their OWN, SEPARATE Neon Postgres databases (no schema merge, no
// Prisma coupling). We talk to those DBs with raw `pg` SQL through a small
// connection Pool per brand, gated on the brand's *_DATABASE_URL env var.
//
// Storage stays separate per brand. This module is READ + light status
// management only. It NEVER touches MerrySails' own DB / Prisma.
//
// Safety contract:
//   - Pools are created lazily and ONLY when the brand's env URL is set.
//   - All query helpers CATCH errors and surface them via a result object —
//     they never throw to the page, so an unreachable partner DB renders a
//     per-brand error state instead of crashing the admin.
//
// NOTE: status changes made here do NOT fire the partner app's own
// status-change email (that logic lives in the partner app). For unified
// visibility + basic status management this is acceptable for v1.

import { Pool } from "pg";

export type PartnerBrandKey = "luma" | "vesper";

export interface PartnerBrandConfig {
  key: PartnerBrandKey;
  /** Human label shown in the UI. */
  label: string;
  /** reservationId prefix, used for the brand badge / quick recognition. */
  prefix: string;
  /** env var that holds the brand's Neon connection string. */
  envVar: "LUMA_DATABASE_URL" | "VESPER_DATABASE_URL";
  /** Tailwind classes for the brand badge. */
  badgeClass: string;
  /**
   * Whether the brand's "Reservation" table has confirmedAt/completedAt
   * timestamp columns. Vesper does; Luma does not. Drives the UPDATE shape so
   * we never reference a column that doesn't exist on that brand.
   */
  hasStatusTimestamps: boolean;
}

export const PARTNER_BRANDS: readonly PartnerBrandConfig[] = [
  {
    key: "luma",
    label: "Luma Yacht",
    prefix: "LUMA-",
    envVar: "LUMA_DATABASE_URL",
    badgeClass: "border-violet-200 bg-violet-50 text-violet-700",
    hasStatusTimestamps: false,
  },
  {
    key: "vesper",
    label: "Vesper",
    prefix: "VSP-",
    envVar: "VESPER_DATABASE_URL",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
    hasStatusTimestamps: true,
  },
] as const;

export function getPartnerBrand(
  key: string
): PartnerBrandConfig | undefined {
  return PARTNER_BRANDS.find((brand) => brand.key === key);
}

export function isPartnerBrandConfigured(brand: PartnerBrandConfig): boolean {
  return Boolean(process.env[brand.envVar]?.trim());
}

/** Status values accepted for a status change from the MerrySails tab. */
export const PARTNER_STATUSES = [
  "new",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type PartnerStatus = (typeof PARTNER_STATUSES)[number];

export function isPartnerStatus(value: string): value is PartnerStatus {
  return (PARTNER_STATUSES as readonly string[]).includes(value);
}

export interface PartnerReservation {
  brandKey: PartnerBrandKey;
  brandLabel: string;
  reservationId: string;
  tourSlug: string | null;
  tourName: string | null;
  date: Date | null;
  time: string | null;
  guests: number | null;
  totalPrice: number | null;
  currency: string | null;
  status: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  customerCountry: string | null;
  notes: string | null;
  createdAt: Date | null;
}

export interface PartnerReservationResult {
  brandKey: PartnerBrandKey;
  brandLabel: string;
  /** "configured" = env set & query ran; "unconfigured" = env URL missing. */
  state: "configured" | "unconfigured" | "error";
  reservations: PartnerReservation[];
  error: string | null;
}

// ─── Connection pools (lazy, gated) ─────────────────────────────
// One Pool per brand. Pools are cached on the global object so warm serverless
// invocations reuse the connection (mirrors the Prisma singleton pattern in
// src/lib/db.ts). A pool is only ever created when the env URL is present.

type PartnerPoolStore = Partial<Record<PartnerBrandKey, Pool>>;

const globalForPartnerPools = globalThis as unknown as {
  __partnerBrandPools?: PartnerPoolStore;
};

function getPool(brand: PartnerBrandConfig): Pool | null {
  const connectionString = process.env[brand.envVar]?.trim();

  if (!connectionString) {
    return null;
  }

  const store = (globalForPartnerPools.__partnerBrandPools ??= {});

  if (!store[brand.key]) {
    store[brand.key] = new Pool({
      connectionString,
      max: 2,
      // Neon pooled endpoints terminate TLS; the cert chain is fine but we keep
      // this lenient to avoid env-specific CA issues, matching how the app
      // already normalizes sslmode for the primary DB.
      ssl: { rejectUnauthorized: false },
      // Fail fast instead of hanging the admin page if a partner DB is down.
      connectionTimeoutMillis: 8000,
    });

    // Swallow idle-client errors so a transient partner DB blip can't crash
    // the MerrySails process.
    store[brand.key]!.on("error", () => {
      /* noop — surfaced per-query instead */
    });
  }

  return store[brand.key] ?? null;
}

// Columns shared by BOTH partner schemas (MerrySails forks). We deliberately
// avoid brand-specific columns (Vesper's bookingType/confirmedAt/completedAt)
// in the SELECT so one query shape works for both.
const SELECT_COLUMNS = `
  "reservationId", "tourSlug", "tourName", "date", "time", "guests",
  "totalPrice", "currency", "status", "customerName", "customerEmail",
  "customerPhone", "customerCountry", "notes", "createdAt"
`;

interface ListOptions {
  status?: string;
  search?: string;
  limit?: number;
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function toDateOrNull(value: unknown): Date | null {
  if (!value) {
    return null;
  }
  const d = value instanceof Date ? value : new Date(value as string);
  return Number.isNaN(d.getTime()) ? null : d;
}

function mapRow(
  brand: PartnerBrandConfig,
  row: Record<string, unknown>
): PartnerReservation {
  return {
    brandKey: brand.key,
    brandLabel: brand.label,
    reservationId: String(row.reservationId ?? ""),
    tourSlug: row.tourSlug != null ? String(row.tourSlug) : null,
    tourName: row.tourName != null ? String(row.tourName) : null,
    date: toDateOrNull(row.date),
    time: row.time != null ? String(row.time) : null,
    guests: toNumberOrNull(row.guests),
    totalPrice: toNumberOrNull(row.totalPrice),
    currency: row.currency != null ? String(row.currency) : null,
    status: row.status != null ? String(row.status) : "new",
    customerName: row.customerName != null ? String(row.customerName) : null,
    customerEmail: row.customerEmail != null ? String(row.customerEmail) : null,
    customerPhone: row.customerPhone != null ? String(row.customerPhone) : null,
    customerCountry:
      row.customerCountry != null ? String(row.customerCountry) : null,
    notes: row.notes != null ? String(row.notes) : null,
    createdAt: toDateOrNull(row.createdAt),
  };
}

/**
 * Read reservations from ONE partner brand, newest-first. Never throws: a
 * missing env URL → state "unconfigured"; a query/connection failure →
 * state "error" with a message.
 */
export async function listPartnerReservations(
  brand: PartnerBrandConfig,
  options: ListOptions = {}
): Promise<PartnerReservationResult> {
  const base: Omit<PartnerReservationResult, "state" | "reservations" | "error"> = {
    brandKey: brand.key,
    brandLabel: brand.label,
  };

  const pool = getPool(brand);

  if (!pool) {
    return { ...base, state: "unconfigured", reservations: [], error: null };
  }

  const where: string[] = [];
  const values: unknown[] = [];

  const status = options.status?.trim().toLowerCase();
  if (status && status !== "all") {
    if (status === "new") {
      // Treat legacy "pending"/"quoted" intake states as "new" for filtering.
      where.push(`lower("status") = ANY($${values.length + 1})`);
      values.push(["new", "pending", "quoted"]);
    } else {
      where.push(`lower("status") = $${values.length + 1}`);
      values.push(status);
    }
  }

  const search = options.search?.trim();
  if (search) {
    const idx = values.length + 1;
    where.push(
      `("reservationId" ILIKE $${idx} OR "customerName" ILIKE $${idx} OR "customerEmail" ILIKE $${idx})`
    );
    values.push(`%${search}%`);
  }

  const limit = Math.min(Math.max(options.limit ?? 120, 1), 500);
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const sql = `
    SELECT ${SELECT_COLUMNS}
    FROM "Reservation"
    ${whereClause}
    ORDER BY "createdAt" DESC
    LIMIT ${limit}
  `;

  try {
    const result = await pool.query(sql, values);
    return {
      ...base,
      state: "configured",
      reservations: result.rows.map((row) =>
        mapRow(brand, row as Record<string, unknown>)
      ),
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown partner DB error.";
    return { ...base, state: "error", reservations: [], error: message };
  }
}

/** Read all configured partner brands in parallel. Never throws. */
export async function listAllPartnerReservations(
  options: ListOptions & { brand?: string } = {}
): Promise<PartnerReservationResult[]> {
  const wanted =
    options.brand && options.brand !== "all"
      ? PARTNER_BRANDS.filter((b) => b.key === options.brand)
      : PARTNER_BRANDS;

  return Promise.all(
    wanted.map((brand) => listPartnerReservations(brand, options))
  );
}

export interface UpdateStatusResult {
  ok: boolean;
  error: string | null;
}

/**
 * Update a single partner reservation's status via raw SQL. Vesper also gets
 * its confirmedAt/completedAt timestamps maintained; Luma has no such columns,
 * so we only touch status + updatedAt there. Never throws.
 *
 * Reminder: this does NOT send the partner brand's customer status email —
 * that logic lives in the partner app.
 */
export async function updatePartnerReservationStatus(
  brandKey: string,
  reservationId: string,
  status: string
): Promise<UpdateStatusResult> {
  const brand = getPartnerBrand(brandKey);

  if (!brand) {
    return { ok: false, error: "Unknown partner brand." };
  }

  if (!isPartnerStatus(status)) {
    return { ok: false, error: `Invalid status "${status}".` };
  }

  const trimmedId = reservationId.trim();
  if (!trimmedId) {
    return { ok: false, error: "Reservation ID is required." };
  }

  const pool = getPool(brand);
  if (!pool) {
    return {
      ok: false,
      error: `${brand.label} database URL is not configured.`,
    };
  }

  // Build the SET clause. Both forks have updatedAt; only Vesper has the
  // confirmed/completed timestamp columns.
  const sets = [`"status" = $1`, `"updatedAt" = now()`];
  if (brand.hasStatusTimestamps) {
    sets.push(
      `"confirmedAt" = CASE WHEN $1 = 'confirmed' THEN now() ELSE "confirmedAt" END`
    );
    sets.push(
      `"completedAt" = CASE WHEN $1 = 'completed' THEN now() ELSE "completedAt" END`
    );
  }

  const sql = `
    UPDATE "Reservation"
    SET ${sets.join(", ")}
    WHERE "reservationId" = $2
  `;

  try {
    const result = await pool.query(sql, [status, trimmedId]);
    if (result.rowCount === 0) {
      return {
        ok: false,
        error: `No ${brand.label} reservation found for ${trimmedId}.`,
      };
    }
    return { ok: true, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown partner DB error.";
    return { ok: false, error: message };
  }
}
