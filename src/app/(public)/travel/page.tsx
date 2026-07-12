import { db } from "@/lib/db";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import EditorialImage from "@/components/ui/EditorialImage";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata(await getLocale(), "/travel", { titleEn: "Travel Guide | Time Taxi Khaolak", titleTh: "คู่มือท่องเที่ยว | Time Taxi Khaolak", descriptionEn: "Explore Khao Lak, Phang Nga, Phuket, and nearby travel destinations with local transfer tips.", descriptionTh: "สำรวจเขาหลัก พังงา ภูเก็ต และจุดท่องเที่ยวใกล้เคียงพร้อมคำแนะนำการเดินทางจากคนท้องถิ่น" });
}

export default async function TravelPage() {
  const attractions = await db.attraction.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  const locale = await getLocale();

  return <div className="min-h-screen bg-[#f3eadb] py-16 text-[#102326] md:py-20"><div className="mx-auto max-w-6xl px-5 md:px-8"><p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#e46d52]">{locale === "th" ? "ออกไปให้ไกลขึ้น" : "Go a little further"}</p><h1 className="mb-3 text-center text-5xl text-[#102326]">{locale === "th" ? "สถานที่ที่คุ้มค่าแก่การแวะ" : "Places worth the detour."}</h1><p className="mb-10 text-center text-sm text-[#102326]/60">{locale === "th" ? "สำรวจจุดหมายที่ดีที่สุดรอบเขาหลักและภาคใต้ของประเทศไทย" : "Explore the best destinations around Khao Lak and Southern Thailand."}</p><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{attractions.map((attraction) => <article key={attraction.attractionsId} className="group overflow-hidden rounded-[1.5rem] border border-[#102326]/15 bg-[#eadfce] transition-colors hover:border-[#e46d52]"><div className="relative h-48 overflow-hidden bg-[#0b2a2f]"><EditorialImage src={attraction.imageUrl} alt={locale === "th" ? attraction.nameTh : attraction.nameEn} className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" /></div><div className="p-5"><h2 className="mb-2 text-2xl text-[#102326] transition-colors group-hover:text-[#e46d52]">{locale === "th" ? attraction.nameTh : attraction.nameEn}</h2><p className="text-sm leading-relaxed text-[#102326]/65">{locale === "th" ? attraction.descriptionTh : attraction.descriptionEn}</p></div></article>)}</div></div></div>;
}
