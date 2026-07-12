import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface BookingEmailData {
  bookingRef: string;
  fullName: string;
  phone: string;
  phoneCountry: string;
  email?: string | null;
  adultPassengers: number;
  childPassengers: number;
  pickupDate: Date;
  pickupTime: string;
  vehicleType: string;
  pickupType: string;
  pickupDetail?: string | null;
  dropoffLocation: string;
  mapsLink?: string | null;
  contactChannel: string;
  contactInfo: string;
  notes?: string | null;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

function safeHttpUrl(value: string | null | undefined): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? escapeHtml(url.toString())
      : null;
  } catch {
    return null;
  }
}

export function buildBookingEmailHtml(b: BookingEmailData): string {
  const bookingRef = escapeHtml(b.bookingRef);
  const fullName = escapeHtml(b.fullName);
  const phoneCountry = escapeHtml(b.phoneCountry);
  const phone = escapeHtml(b.phone);
  const email = b.email ? escapeHtml(b.email) : null;
  const contactChannel = escapeHtml(b.contactChannel);
  const contactInfo = escapeHtml(b.contactInfo);
  const vehicleType = escapeHtml(b.vehicleType);
  const pickupTime = escapeHtml(b.pickupTime);
  const pickupType = escapeHtml(b.pickupType);
  const pickupDetail = b.pickupDetail ? escapeHtml(b.pickupDetail) : null;
  const dropoffLocation = escapeHtml(b.dropoffLocation);
  const mapsLink = safeHttpUrl(b.mapsLink);
  const notes = b.notes ? escapeHtml(b.notes) : null;

  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <style>
    body  { font-family: Arial, sans-serif; background:#f0f0f0; margin:0; padding:20px; }
    .wrap { max-width:600px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,.12); }
    .hdr  { background:#0a1628; padding:28px 32px; text-align:center; }
    .hdr h1 { color:#d4af37; margin:0 0 6px; font-size:22px; }
    .hdr p  { color:#aaa; margin:0; font-size:13px; }
    .ref  { background:#d4af37; color:#0a1628; text-align:center; padding:12px; font-weight:700; font-size:18px; letter-spacing:1px; }
    .body { padding:28px 32px; }
    .sec  { margin-bottom:22px; }
    .sec-title { font-size:13px; font-weight:700; color:#0a1628; text-transform:uppercase; letter-spacing:.05em; border-bottom:2px solid #d4af37; padding-bottom:6px; margin-bottom:14px; }
    .row  { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0f0f0; font-size:14px; }
    .row:last-child { border-bottom:none; }
    .lbl  { color:#888; }
    .val  { font-weight:600; color:#222; text-align:right; max-width:60%; }
    .badge { display:inline-block; background:#0f2040; color:#d4af37; padding:3px 10px; border-radius:20px; font-size:13px; font-weight:600; }
    .cta  { background:#0a1628; padding:24px 32px; text-align:center; }
    .btn  { display:inline-block; background:#25d366; color:#fff; padding:12px 28px; border-radius:30px; text-decoration:none; font-weight:700; font-size:15px; }
    .ftr  { padding:16px; text-align:center; font-size:12px; color:#aaa; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <h1>🚗 Time Taxi Khaolak</h1>
    <p>New Booking Received — Please Confirm</p>
  </div>

  <div class="ref">Booking Ref: ${bookingRef}</div>

  <div class="body">

    <div class="sec">
      <div class="sec-title">Customer Info</div>
      <div class="row"><span class="lbl">Name</span><span class="val">${fullName}</span></div>
      <div class="row"><span class="lbl">Phone</span><span class="val">${phoneCountry} ${phone}</span></div>
      ${email ? `<div class="row"><span class="lbl">Email</span><span class="val">${email}</span></div>` : ""}
      <div class="row"><span class="lbl">Contact via</span><span class="val"><span class="badge">${contactChannel}</span> ${contactInfo}</span></div>
    </div>

    <div class="sec">
      <div class="sec-title">Transfer Details</div>
      <div class="row"><span class="lbl">Vehicle</span><span class="val"><span class="badge">${vehicleType}</span></span></div>
      <div class="row"><span class="lbl">Passengers</span><span class="val">${b.adultPassengers} adults${b.childPassengers > 0 ? `, ${b.childPassengers} children` : ""}</span></div>
      <div class="row"><span class="lbl">Pickup Date</span><span class="val">${formatDate(b.pickupDate)}</span></div>
      <div class="row"><span class="lbl">Pickup Time</span><span class="val">${pickupTime}</span></div>
      <div class="row"><span class="lbl">Pickup Type</span><span class="val">${pickupType}${pickupDetail ? ` — ${pickupDetail}` : ""}</span></div>
      <div class="row"><span class="lbl">Drop-off</span><span class="val">${dropoffLocation}</span></div>
      ${mapsLink ? `<div class="row"><span class="lbl">Maps Link</span><span class="val"><a href="${mapsLink}" style="color:#185FA5">View Map</a></span></div>` : ""}
    </div>

    ${
      notes
        ? `
    <div class="sec">
      <div class="sec-title">Special Requests</div>
      <p style="font-size:14px;color:#444;margin:0;">${notes}</p>
    </div>`
        : ""
    }

  </div>

  <div class="cta">
    <a href="https://wa.me/${phoneCountry.replace("+", "")}${phone.replace(/[^0-9]/g, "")}" class="btn">
      💬 Reply on WhatsApp
    </a>
  </div>

  <div class="ftr">
    Booking submitted via timetaxikhaolak.com<br/>
    Time Taxi Khaolak — Khao Lak, Phang Nga, Thailand
  </div>
</div>
</body>
</html>`;
}

function buildBookingEmailText(b: BookingEmailData): string {
  return [
    `New booking: ${b.bookingRef}`,
    `Name: ${b.fullName}`,
    `Phone: ${b.phoneCountry} ${b.phone}`,
    `Contact: ${b.contactChannel} ${b.contactInfo}`,
    `Vehicle: ${b.vehicleType}`,
    `Passengers: ${b.adultPassengers} adults, ${b.childPassengers} children`,
    `Pickup: ${formatDate(b.pickupDate)} ${b.pickupTime}`,
    `Pickup location: ${b.pickupType} ${b.pickupDetail ?? ""}`.trim(),
    `Drop-off: ${b.dropoffLocation}`,
    b.mapsLink ? `Map: ${b.mapsLink}` : "",
    b.notes ? `Notes: ${b.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendBookingEmail(
  booking: BookingEmailData,
): Promise<void> {
  const cleanRef = booking.bookingRef.replace(/[\r\n]/g, " ");
  const cleanName = booking.fullName.replace(/[\r\n]/g, " ");
  const subject = `🚗 New Booking ${cleanRef} — ${cleanName} | ${booking.vehicleType}`;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    throw new Error("Email environment variables are not configured");
  }

  await transporter.sendMail({
    from: `"Time Taxi Khaolak" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject,
    html: buildBookingEmailHtml(booking),
    text: buildBookingEmailText(booking),
  });
}
