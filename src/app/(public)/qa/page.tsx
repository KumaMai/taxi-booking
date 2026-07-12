import { db } from "@/lib/db";
import FaqAccordion from "@/components/home/FaqAccordion";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata(await getLocale(), "/qa", { titleEn: "Q&A | Time Taxi Khaolak", titleTh: "คำถามที่พบบ่อย | Time Taxi Khaolak", descriptionEn: "Find answers about booking, payment, vehicles, pickup, and private taxi transfers.", descriptionTh: "ค้นหาคำตอบเกี่ยวกับการจอง การชำระเงิน รถรับส่ง จุดรับ และบริการแท็กซี่ส่วนตัว" });
}

export default async function QAPage() {
  const [categories, locale] = await Promise.all([db.faqCategory.findMany({ where: { isActive: true }, include: { faqs: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { sortOrder: "asc" } }), getLocale()]);
  const thai = locale === "th";
  return <div className="min-h-screen bg-[#f3eadb] py-16 text-[#102326] md:py-20"><div className="mx-auto max-w-5xl px-5 md:px-8"><h1 className="mb-3 text-center text-5xl text-[#102326]">{thai ? "คำถามที่พบบ่อย" : "Q & A"}</h1><p className="mb-10 text-center text-sm text-[#102326]/55">{thai ? "หาคำตอบไม่เจอใช่ไหม ติดต่อเราผ่าน WhatsApp ได้เลย เราจะตอบกลับภายใน 1 นาที" : "Can't find your answer? Contact us via WhatsApp — we reply within 1 minute."}</p><FaqAccordion categories={categories} locale={locale} /></div></div>;
}
