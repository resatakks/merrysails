"use client";

import { useState } from "react";
import { Search, Mail, Hash, Calendar, Users, Clock, Loader2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { getReservationsByEmail } from "@/app/actions/reservation";

type SearchMode = "id" | "email";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

interface ReservationResult {
  reservationId: string;
  tourName: string;
  date: string | Date;
  time: string;
  guests: number;
  status: string;
  totalPrice: number;
  currency: string;
}

export default function ReservationSearch() {
  const [mode, setMode] = useState<SearchMode>("id");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ReservationResult[] | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = id.trim().toUpperCase();
    if (trimmed) {
      router.push(`/reservation/${trimmed}`);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;

    setLoading(true);
    setError("");
    setResults(null);

    const result = await getReservationsByEmail(trimmed);
    setLoading(false);

    if (result.success && result.reservations) {
      if (result.reservations.length === 0) {
        setError("No reservations found for this email address.");
      } else {
        setResults(result.reservations);
      }
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab switcher */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] p-1.5 flex gap-1">
        <button
          onClick={() => { setMode("id"); setResults(null); setError(""); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "id"
              ? "bg-[var(--brand-primary)] text-white shadow-sm"
              : "text-[var(--text-muted)] hover:text-[var(--body-text)]"
          }`}
        >
          <Hash className="w-4 h-4" />
          Reservation ID
        </button>
        <button
          onClick={() => { setMode("email"); setResults(null); setError(""); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "email"
              ? "bg-[var(--brand-primary)] text-white shadow-sm"
              : "text-[var(--text-muted)] hover:text-[var(--body-text)]"
          }`}
        >
          <Mail className="w-4 h-4" />
          Email Address
        </button>
      </div>

      {/* Search form */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] p-6 space-y-4">
        {mode === "id" ? (
          <form onSubmit={handleIdSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Reservation ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="MRY-2026-0001"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--line)] focus:border-[var(--brand-primary)] focus:outline-none transition-colors text-center text-lg font-mono tracking-wider uppercase"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1.5 text-center">
                Find this in your confirmation email
              </p>
            </div>
            <button
              type="submit"
              disabled={!id.trim()}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--brand-primary)] text-white font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-4 h-4" />
              Find Reservation
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--line)] focus:border-[var(--brand-primary)] focus:outline-none transition-colors text-center text-sm"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1.5 text-center">
                The email you used when booking
              </p>
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--brand-primary)] text-white font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Find My Bookings
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] p-6 text-center">
          <p className="text-sm text-[var(--text-muted)]">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-[var(--text-muted)] px-1">
            Found {results.length} reservation{results.length > 1 ? "s" : ""}
          </p>
          {results.map((r) => (
            <a
              key={r.reservationId}
              href={`/reservation/${r.reservationId}`}
              className="block bg-white rounded-2xl shadow-sm border border-[var(--line)] p-5 hover:border-[var(--brand-primary)]/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs font-mono text-[var(--brand-primary)] font-bold">{r.reservationId}</div>
                  <h3 className="font-semibold text-[var(--heading)] mt-0.5 group-hover:text-[var(--brand-primary)] transition-colors">
                    {r.tourName}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[r.status] || "bg-gray-100 text-gray-800"}`}>
                    {statusLabels[r.status] || r.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] transition-colors" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--body-text)]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  {format(new Date(r.date), "dd MMM yyyy")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  {r.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  {r.guests} guest{r.guests > 1 ? "s" : ""}
                </span>
                <span className="font-bold text-[var(--heading)] ml-auto">
                  {r.currency === "EUR" ? "€" : r.currency}{r.totalPrice}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
