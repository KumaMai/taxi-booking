import { db } from "@/lib/db";
import Link from "next/link";

async function getStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [total, pending, confirmed, completed, cancelled, notificationPending, notificationFailed, todayCount, recent] =
    await Promise.all([
      db.booking.count(),
      db.booking.count({ where: { status: "PENDING" } }),
      db.booking.count({ where: { status: "CONFIRMED" } }),
      db.booking.count({ where: { status: "COMPLETED" } }),
      db.booking.count({ where: { status: "CANCELLED" } }),
      db.booking.count({ where: { notificationStatus: "PENDING" } }),
      db.booking.count({ where: { notificationStatus: "FAILED" } }),
      db.booking.count({ where: { createdAt: { gte: today } } }),
      db.booking.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
    ]);

  return {
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    notificationPending,
    notificationFailed,
    todayCount,
    recent,
  };
}

const STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  CONFIRMED: "bg-blue-500/15   text-blue-400   border-blue-500/30",
  COMPLETED: "bg-green-500/15  text-green-400  border-green-500/30",
  CANCELLED: "bg-red-500/15    text-red-400    border-red-500/30",
};

export default async function DashboardPage() {
  const s = await getStats();

  const STAT_CARDS = [
    {
      label: "Total Bookings",
      value: s.total,
      color: "text-white",
      bg: "bg-[#0f2040]",
    },
    {
      label: "Today",
      value: s.todayCount,
      color: "text-[#d4af37]",
      bg: "bg-[#0f2040]",
    },
    {
      label: "Pending",
      value: s.pending,
      color: "text-yellow-400",
      bg: "bg-[#0f2040]",
    },
    {
      label: "Confirmed",
      value: s.confirmed,
      color: "text-blue-400",
      bg: "bg-[#0f2040]",
    },
    {
      label: "Completed",
      value: s.completed,
      color: "text-green-400",
      bg: "bg-[#0f2040]",
    },
    {
      label: "Cancelled",
      value: s.cancelled,
      color: "text-red-400",
      bg: "bg-[#0f2040]",
    },
    {
      label: "Notify pending",
      value: s.notificationPending,
      color: "text-yellow-400",
      bg: "bg-[#0f2040]",
    },
    {
      label: "Notify failed",
      value: s.notificationFailed,
      color: "text-red-400",
      bg: "bg-[#0f2040]",
    },
  ];

  return (
    <div className="min-h-full p-5 md:p-8">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e46d52]">Today&apos;s operations</p>
        <h1 className="text-4xl text-[#102326]">A clear view of the road ahead.</h1>
        <p className="text-white/40 text-sm mt-1">ภาพรวมการจองทั้งหมด</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {STAT_CARDS.map((c) => (
          <div
            key={c.label}
            className="rounded-[1.25rem] border border-[#102326]/15 bg-[#eadfce] p-4 text-center"
          >
            <p className={`font-bold text-3xl ${c.color}`}>{c.value}</p>
            <p className="mt-1 text-xs text-[#102326]/55">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="overflow-hidden rounded-[1.5rem] border border-[#102326]/15 bg-[#eadfce]">
        <div className="flex items-center justify-between border-b border-[#102326]/10 px-5 py-4">
          <h2 className="text-sm font-semibold text-[#102326]">Recent Bookings</h2>
          <Link
            href="/admin/bookings"
            className="text-xs text-[#e46d52] hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#102326]/10 text-xs text-[#102326]/55">
                <th className="px-5 py-3 text-left font-medium">Ref</th>
                <th className="px-5 py-3 text-left font-medium">Name</th>
                <th className="px-5 py-3 text-left font-medium">Vehicle</th>
                <th className="px-5 py-3 text-left font-medium">Pickup Date</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {s.recent.map((b, i) => (
                <tr
                  key={b.bookingsId}
                  className={`border-b border-[#102326]/10 ${i % 2 === 0 ? "bg-[#102326]/[0.03]" : ""}`}
                >
                  <td className="max-w-[120px] truncate px-5 py-3 font-mono text-xs text-[#e46d52]">
                    {b.bookingRef.slice(0, 16)}...
                  </td>
                  <td className="px-5 py-3 text-[#102326]/80">{b.fullName}</td>
                  <td className="px-5 py-3 text-[#102326]/60">{b.vehicleType}</td>
                  <td className="px-5 py-3 text-[#102326]/60">
                    {b.pickupDate.toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_COLOR[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-[#102326]/50">
                    {b.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
