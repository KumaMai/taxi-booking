import BookingForm from "@/components/booking/BookingForm";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata(await getLocale(), "/booking", { titleEn: "Book a Car | Time Taxi Khaolak", titleTh: "จองรถ | Time Taxi Khaolak", descriptionEn: "Book your private taxi transfer from Phuket Airport, Khao Lak, and nearby destinations.", descriptionTh: "จองรถรับส่งส่วนตัวจากสนามบินภูเก็ต เขาหลัก และจุดหมายปลายทางใกล้เคียง" });
}

export default async function BookingPage() {
  const [settings, locale] = await Promise.all([getSettings(), getLocale()]);
  const thai = locale === "th";
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`;
  const lineLink = `https://line.me/ti/p/~${encodeURIComponent(settings.lineId)}`;
  return <div className="min-h-screen bg-[#f3eadb] py-12 text-[#102326] md:py-20"><div className="mx-auto max-w-6xl px-5 md:px-8"><div className="mb-8 text-center"><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e46d52]">{thai ? "เริ่มต้นการเดินทางอย่างสบายใจ" : "A quiet start to your trip"}</p><h1 className="mb-3 text-5xl md:text-6xl">{thai ? "จองรถรับส่งส่วนตัว" : "Book your private transfer."}</h1><p className="text-sm text-[#102326]/65 md:text-base">{thai ? "กรอกรายละเอียดด้านล่าง เราจะยืนยันภายใน 1 นาที" : "Fill in the details below — we will confirm within 1 minute"}</p><div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-[#102326]/60"><span>✓ {thai ? "ไม่ต้องวางมัดจำ" : "No deposit"}</span><span>✓ {thai ? "จ่ายหลังเดินทาง" : "Pay after trip"}</span><span>✓ {thai ? "บริการ 24 ชั่วโมง" : "24/7 service"}</span><span>✓ {thai ? "คนขับสื่อสารภาษาอังกฤษได้" : "English-speaking drivers"}</span></div></div><BookingForm whatsapp={settings.whatsapp} locale={locale} /><div className="mt-8 text-center"><p className="mb-3 text-sm text-[#102326]/55">{thai ? "หรือจองโดยตรงผ่าน" : "Or book directly via"}</p><div className="flex flex-wrap justify-center gap-3"><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#102326]/15 bg-[#eadfce] px-4 py-2 text-xs">💬 WhatsApp</a><a href={lineLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0f2040] px-4 py-2 text-xs text-white">📱 LINE</a><a href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`} className="rounded-full bg-[#0f2040] px-4 py-2 text-xs text-white">📞 {thai ? "โทร" : "Call"}</a></div></div></div></div>;
}
