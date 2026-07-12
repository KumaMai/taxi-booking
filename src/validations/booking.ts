import { z } from "zod";

const PHONE_PATTERN = /^[0-9][0-9\s-]{7,17}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export function getBangkokDateString(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function isSafeHttpUrl(value: string): boolean {
  if (value === "") return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export const bookingSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "กรุณากรอกชื่อ-นามสกุล")
      .max(100, "ชื่อต้องไม่เกิน 100 ตัวอักษร"),
    phoneCountry: z.string().regex(/^\+\d{1,4}$/, "รหัสประเทศไม่ถูกต้อง"),
    phone: z
      .string()
      .trim()
      .regex(PHONE_PATTERN, "เบอร์โทรไม่ถูกต้อง")
      .max(18),
    email: z
      .string()
      .trim()
      .max(254)
      .email("อีเมลไม่ถูกต้อง")
      .optional()
      .or(z.literal("")),
    adultPassengers: z
      .number()
      .int()
      .min(1, "ต้องมีผู้โดยสารอย่างน้อย 1 คน")
      .max(9),
    childPassengers: z.number().int().min(0).max(9),
    pickupDate: z
      .string()
      .regex(DATE_PATTERN, "วันที่ไม่ถูกต้อง")
      .refine(
        (value) => value >= getBangkokDateString(),
        "วันที่รับต้องไม่เป็นอดีต",
      ),
    pickupTime: z.string().regex(TIME_PATTERN, "เวลาไม่ถูกต้อง"),
    vehicleType: z.enum(["SEDAN", "SUV", "VAN"]),
    pickupType: z.enum(["AIRPORT", "HOTEL", "OTHER"]),
    pickupDetail: z.string().trim().max(200).optional(),
    dropoffLocation: z
      .string()
      .trim()
      .min(2, "กรุณากรอกจุดส่ง")
      .max(200),
    mapsLink: z
      .string()
      .trim()
      .max(500)
      .refine(isSafeHttpUrl, "ลิงก์แผนที่ไม่ถูกต้อง")
      .optional(),
    contactChannel: z.enum(["WHATSAPP", "LINE", "WECHAT", "EMAIL"]),
    contactInfo: z
      .string()
      .trim()
      .min(1, "กรุณากรอกข้อมูลติดต่อ")
      .max(254),
    notes: z.string().trim().max(2000).optional(),
    website: z.string().max(0, "Invalid submission").optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (
      (data.pickupType === "AIRPORT" || data.pickupType === "HOTEL") &&
      !data.pickupDetail
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["pickupDetail"],
        message:
          data.pickupType === "AIRPORT"
            ? "กรุณากรอกหมายเลขเที่ยวบิน"
            : "กรุณากรอกชื่อโรงแรม",
      });
    }

    if (
      data.contactChannel === "EMAIL" &&
      !z.string().email().safeParse(data.contactInfo).success
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["contactInfo"],
        message: "กรุณากรอกอีเมลสำหรับติดต่อให้ถูกต้อง",
      });
    }
  });

export type BookingSchemaInput = z.input<typeof bookingSchema>;
export type BookingSchemaType = z.output<typeof bookingSchema>;
