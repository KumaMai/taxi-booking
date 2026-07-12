import { after, NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingSchema } from "@/validations/booking";
import { sendBookingEmail } from "@/lib/email";
import { checkDistributedRateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 32 * 1024;
const BOOKING_RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const rateLimit = await checkDistributedRateLimit(
      `booking:${getClientIp(request)}`,
      BOOKING_RATE_LIMIT,
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many booking attempts. Please try again later.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        },
      );
    }

    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Request is too large." },
        { status: 413 },
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Request is too large." },
        { status: 413 },
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 },
      );
    }

    // 1. Validate
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: parsed.error.issues,
        },
        { status: 400 },
      );
    }
    const data = parsed.data;

    // 2. Insert to DB
    const booking = await db.booking.create({
      data: {
        fullName: data.fullName,
        phoneCountry: data.phoneCountry,
        phone: data.phone,
        email: data.email || null,
        adultPassengers: data.adultPassengers,
        childPassengers: data.childPassengers,
        pickupDate: new Date(data.pickupDate),
        pickupTime: data.pickupTime,
        vehicleType: data.vehicleType,
        pickupType: data.pickupType,
        pickupDetail: data.pickupDetail || null,
        dropoffLocation: data.dropoffLocation,
        mapsLink: data.mapsLink || null,
        contactChannel: data.contactChannel,
        contactInfo: data.contactInfo,
        notes: data.notes || null,
        status: "PENDING",
        source: "WEBSITE",
      },
    });

    // 3. Finish the notification after the response lifecycle safely.
    after(async () => {
      const maxAttempts = 3;
      for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
          await db.booking.update({ where: { bookingsId: booking.bookingsId }, data: { notificationAttempts: attempt } });
          await sendBookingEmail(booking);
          await db.booking.update({ where: { bookingsId: booking.bookingsId }, data: { notificationStatus: "SENT", notificationSentAt: new Date(), notificationLastError: null } });
          return;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown notification error";
          await db.booking.update({ where: { bookingsId: booking.bookingsId }, data: { notificationStatus: attempt === maxAttempts ? "FAILED" : "PENDING", notificationLastError: message.slice(0, 500) } });
          if (attempt < maxAttempts) await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** (attempt - 1)));
          else console.error("Booking notification failed", { bookingRef: booking.bookingRef, error });
        }
      }
    });

    // 4. Return success
    return NextResponse.json({
      success: true,
      bookingRef: booking.bookingRef,
      message: "Booking received! We will contact you within 1 minute.",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
