import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "กรุณากรอกชื่อ-นามสกุล"),
  phoneCountry: z.string().default("+66"),
  phone: z.string().min(9, "เบอร์โทรไม่ถูกต้อง").max(15),
  email: z.string().email("อีเมลไม่ถูกต้อง").optional().or(z.literal("")),
  adultPassengers: z.number().min(1, "ต้องมีผู้โดยสารอย่างน้อย 1 คน").max(9),
  childPassengers: z.number().min(0).max(9),
  pickupDate: z.string().min(1, "กรุณาเลือกวันที่"),
  pickupTime: z.string().min(1, "กรุณาเลือกเวลา"),
  vehicleType: z.enum(["sedan", "suv", "van"]),
  pickupType: z.enum(["airport", "hotel", "other"]),
  pickupDetail: z.string().optional(),
  dropoffLocation: z.string().min(2, "กรุณากรอกจุดส่ง"),
  mapsLink: z.string().optional(),
  contactChannel: z.enum(["whatsapp", "line", "wechat", "email"]),
  contactInfo: z.string().min(1, "กรุณากรอกข้อมูลติดต่อ"),
  notes: z.string().optional(),
});

export type BookingSchemaType = z.infer<typeof bookingSchema>;
