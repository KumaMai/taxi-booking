import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingSchema } from "@/validations/booking";
import { sendBookingEmail } from "@/lib/email";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate
    const data = bookingSchema.parse(body);

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

    // 3. Send email (non-blocking — ไม่ให้ email fail กระทบ booking)
    sendBookingEmail(booking).catch((err) =>
      console.error("Email failed:", err),
    );

    // 4. Return success
    return NextResponse.json({
      success: true,
      bookingRef: booking.bookingRef,
      message: "Booking received! We will contact you within 1 minute.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: error.issues },
        { status: 400 },
      );
    }
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
