import { db } from "@/lib/db";
import PriceZoneTable from "@/components/price/PriceZoneTable";
import Link from "next/link";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata(await getLocale(), "/price-list", { titleEn: "Price List | Time Taxi Khaolak", titleTh: "รายการราคา | Time Taxi Khaolak", descriptionEn: "View private transfer prices from Khao Lak and Phuket Airport to major destinations.", descriptionTh: "ดูราคารถรับส่งส่วนตัวจากเขาหลักและสนามบินภูเก็ตไปยังจุดหมายปลายทางสำคัญ" });
}

export default async function PriceListPage() {
  const [zones, settings, locale] = await Promise.all([db.priceZone.findMany({ where: { isActive: true }, include: { routes: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } }, orderBy: { sortOrder: "asc" } }), getSettings(), getLocale()]);
  const thai = locale === "th";
  return <div className="min-h-screen bg-[#f3eadb] py-16 text-[#102326] md:py-20"><div className="mx-auto max-w-6xl px-5 md:px-8"><h1 className="mb-3 text-center text-5xl md:text-6xl">{thai ? "รายการราคา — TIME TAXI KHAOLAK" : "PRICE LIST — TIME TAXI KHAOLAK"}</h1><p className="mb-10 text-center text-sm text-[#102326]/55">{thai ? "ราคาทั้งหมดเป็นเงินบาท — ราคาอ้างอิงเท่านั้น" : "All prices in Thai Baht (THB) — reference prices only"}</p>{zones.map((zone) => <PriceZoneTable key={zone.priceZonesId} zone={zone} locale={locale} />)}<div className="mt-8 rounded-2xl border border-[#102326]/15 bg-[#0f2040] p-6 text-center"><p className="mb-4 text-sm text-[#f3eadb]/70">{thai ? "ราคาเป็นราคาอ้างอิง ค่าโดยสารจริงอาจแตกต่างตามจุดรับส่งและเวลาเดินทาง สอบถามข้อเสนอที่ดีที่สุดผ่าน WhatsApp ได้เลย" : "Prices above are reference rates. Actual fares may vary by pick-up/drop-off location and travel time. For the best offer, message us on WhatsApp."}</p><a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25d366] px-6 py-3 font-bold text-white">📱 {settings.whatsapp}</a></div><div className="mt-8 text-center"><Link href="/booking" className="rounded-full bg-[#e46d52] px-8 py-4 font-bold">{thai ? "จองรถรับส่งตอนนี้" : "Book Your Transfer Now"}</Link></div></div></div>;
}
