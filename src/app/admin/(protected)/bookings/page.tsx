import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import type { BookingStatus } from "@prisma/client";
import { requireAdmin, requireSuperAdmin, writeAuditLog } from "@/lib/admin-auth";
import { sendBookingEmail } from "@/lib/email";
import {
  bookingStatusFilterSchema,
  bookingStatusSchema,
  bookingNotificationRetrySchema,
  formDataToObject,
} from "@/validations/admin";

// ─── Server Action ────────────────────────────────────────────
async function updateStatus(formData: FormData) {
  "use server";
  const admin = await requireAdmin();
  const { id, status } = bookingStatusSchema.parse(formDataToObject(formData));
  await db.booking.update({ where: { bookingsId: id }, data: { status } });
  await writeAuditLog({ adminUserId: admin.adminUsersId, action: "UPDATE_STATUS", entity: "Booking", entityId: String(id), metadata: { status } });
  revalidatePath("/admin/bookings");
}

async function retryNotification(formData: FormData) {
  "use server";
  const admin = await requireSuperAdmin();
  const { id } = bookingNotificationRetrySchema.parse(formDataToObject(formData));
  const booking = await db.booking.findUnique({ where: { bookingsId: id } });
  if (!booking || booking.notificationStatus === "SENT") return;

  const attempt = booking.notificationAttempts + 1;
  await db.booking.update({
    where: { bookingsId: id },
    data: { notificationStatus: "PENDING", notificationAttempts: attempt },
  });

  try {
    await sendBookingEmail(booking);
    await db.booking.update({
      where: { bookingsId: id },
      data: { notificationStatus: "SENT", notificationSentAt: new Date(), notificationLastError: null },
    });
    await writeAuditLog({ adminUserId: admin.adminUsersId, action: "RETRY_NOTIFICATION_SENT", entity: "Booking", entityId: String(id), metadata: { attempt } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown notification error";
    await db.booking.update({
      where: { bookingsId: id },
      data: { notificationStatus: "FAILED", notificationLastError: message.slice(0, 500) },
    });
    await writeAuditLog({ adminUserId: admin.adminUsersId, action: "RETRY_NOTIFICATION_FAILED", entity: "Booking", entityId: String(id), metadata: { attempt } });
  }
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

// ─── Constants ────────────────────────────────────────────────
const STATUSES = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

const STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  CONFIRMED: "bg-blue-500/15   text-blue-400   border-blue-500/30",
  COMPLETED: "bg-green-500/15  text-green-400  border-green-500/30",
  CANCELLED: "bg-red-500/15    text-red-400    border-red-500/30",
};

// ─── Page ─────────────────────────────────────────────────────
export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const { status: filterStatus = "ALL", page: rawPage = "1" } = await searchParams;
  const page = Math.max(1, Number.parseInt(rawPage, 10) || 1);
  const pageSize = 25;
  const parsedFilter = bookingStatusFilterSchema.safeParse(filterStatus);
  const normalizedFilter = parsedFilter.success ? parsedFilter.data : "ALL";
  const where =
    normalizedFilter !== "ALL"
      ? { status: normalizedFilter as BookingStatus }
      : {};

  const [bookings, total] = await Promise.all([
    db.booking.findMany({ where, orderBy: { createdAt: "desc" }, take: pageSize, skip: (page - 1) * pageSize }),
    db.booking.count({ where }),
  ]);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="min-h-full p-5 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#102326]">Bookings</h1>
        <p className="text-white/40 text-sm mt-1">ทั้งหมด {total} รายการ</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/bookings?status=${s}&page=1`}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              normalizedFilter === s
                ? "bg-[#e46d52] text-[#102326] font-medium"
                : "border border-[#102326]/15 bg-[#eadfce] text-[#102326]/60 hover:text-[#102326]"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-[#102326]/60">
        <span>Page {page} of {pageCount}</span>
        <div className="flex gap-2">
          {page > 1 && <Link className="rounded-full border border-[#102326]/15 bg-[#eadfce] px-3 py-1.5" href={`/admin/bookings?status=${normalizedFilter}&page=${page - 1}`}>Previous</Link>}
          {page < pageCount && <Link className="rounded-full border border-[#102326]/15 bg-[#eadfce] px-3 py-1.5" href={`/admin/bookings?status=${normalizedFilter}&page=${page + 1}`}>Next</Link>}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[1.5rem] border border-[#102326]/15 bg-[#0b2a2f]">
        <div className="overflow-x-auto" aria-label="Bookings table; swipe horizontally on small screens">
          <table className="min-w-[980px] w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs border-b border-white/5">
                <th className="px-4 py-3 text-left">Ref</th>
                <th className="px-4 py-3 text-left">ชื่อ</th>
                <th className="px-4 py-3 text-left">โทร</th>
                <th className="px-4 py-3 text-left">Vehicle</th>
                <th className="px-4 py-3 text-left">วันที่รับ</th>
                <th className="px-4 py-3 text-left">Drop-off</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Notify</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-8 text-center text-white/30"
                  >
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                bookings.map((b, i) => (
                  <tr
                    key={b.bookingsId}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                  >
                    <td className="px-4 py-3 text-[#d4af37] font-mono text-xs">
                      {b.bookingRef.slice(0, 16)}...
                    </td>
                    <td className="px-4 py-3 text-white/80">{b.fullName}</td>
                    <td className="px-4 py-3 text-white/50 text-xs">
                      {b.phoneCountry} {b.phone}
                    </td>
                    <td className="px-4 py-3 text-white/60">{b.vehicleType}</td>
                    <td className="px-4 py-3 text-white/60">
                      {b.pickupDate.toLocaleDateString("th-TH")} {b.pickupTime}
                    </td>
                    <td className="px-4 py-3 text-white/60 max-w-[140px] truncate">
                      {b.dropoffLocation}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_COLOR[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${
                        b.notificationStatus === "SENT"
                          ? "bg-green-500/15 text-green-400 border-green-500/30"
                          : b.notificationStatus === "FAILED"
                            ? "bg-red-500/15 text-red-400 border-red-500/30"
                            : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                      }`}>
                        {b.notificationStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {b.status === "PENDING" && (
                          <>
                            <form action={updateStatus}>
                              <input
                                type="hidden"
                                name="id"
                                value={b.bookingsId}
                              />
                              <input
                                type="hidden"
                                name="status"
                                value="CONFIRMED"
                              />
                              <button
                                type="submit"
                                className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs px-2 py-1 rounded-full"
                              >
                                Confirm
                              </button>
                            </form>
                            <form action={updateStatus}>
                              <input
                                type="hidden"
                                name="id"
                                value={b.bookingsId}
                              />
                              <input
                                type="hidden"
                                name="status"
                                value="CANCELLED"
                              />
                              <button
                                type="submit"
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2 py-1 rounded-full"
                              >
                                Cancel
                              </button>
                            </form>
                          </>
                        )}
                        {b.status === "CONFIRMED" && (
                          <form action={updateStatus}>
                            <input
                              type="hidden"
                              name="id"
                              value={b.bookingsId}
                            />
                            <input
                              type="hidden"
                              name="status"
                              value="COMPLETED"
                            />
                            <button
                              type="submit"
                              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 text-xs px-2 py-1 rounded-full"
                            >
                              Complete
                            </button>
                          </form>
                        )}
                        {b.notificationStatus !== "SENT" && (
                          <form action={retryNotification}>
                            <input type="hidden" name="id" value={b.bookingsId} />
                            <button type="submit" className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs px-2 py-1 rounded-full">
                              Retry email
                            </button>
                          </form>
                        )}
                        <a
                          href={
                            "https://wa.me/" +
                            b.phoneCountry.replace("+", "") +
                            b.phone
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/30 text-xs px-2 py-1 rounded-full"
                        >
                          WA
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
