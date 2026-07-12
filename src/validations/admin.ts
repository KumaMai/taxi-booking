import { z } from "zod";

const positiveId = z.coerce.number().int().positive();
const activeValue = z.enum(["true", "false"]).transform((value) => value === "true");

export const bookingStatusSchema = z.object({
  id: positiveId,
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
});

export const bookingNotificationRetrySchema = z.object({
  id: positiveId,
});

export const bookingStatusFilterSchema = z.enum([
  "ALL",
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
]);

export const routePriceSchema = z.object({
  id: positiveId,
  priceStandard: z.coerce.number().int().min(0).max(1_000_000),
  priceSuv: z.coerce.number().int().min(0).max(1_000_000),
  priceVan: z.coerce.number().int().min(0).max(1_000_000),
  isActive: activeValue,
});

export const toggleEntitySchema = z.object({
  id: positiveId,
  isActive: activeValue,
});

export const updateFaqSchema = z.object({
  id: positiveId,
  questionEn: z.string().trim().min(2).max(500),
  questionTh: z.string().trim().min(2).max(500),
  answerEn: z.string().trim().min(2).max(5000),
  answerTh: z.string().trim().min(2).max(5000),
});

export const settingSchema = z.object({
  key: z.enum([
    "whatsapp_number",
    "line_id",
    "phone",
    "email",
    "facebook_page",
    "location",
    "tripadvisor_url",
  ]),
  value: z.string().trim().min(1).max(500),
});

export function formDataToObject(formData: FormData): Record<string, FormDataEntryValue> {
  return Object.fromEntries(formData.entries());
}
