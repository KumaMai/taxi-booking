import { db } from "@/lib/db";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import Link from "next/link";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata(await getLocale(), "/reviews", { titleEn: "Reviews | Time Taxi Khaolak", titleTh: "รีวิวจากลูกค้า | Time Taxi Khaolak", descriptionEn: "Read reviews from travelers who booked private transfers with Time Taxi Khaolak.", descriptionTh: "อ่านรีวิวจากนักท่องเที่ยวที่ใช้บริการรถรับส่งส่วนตัวกับ Time Taxi Khaolak" });
}
const SOURCE_LABELS: Record<string, string> = { TRIPADVISOR: "🌿 TripAdvisor", GOOGLE: "🔍 Google", FACEBOOK: "📘 Facebook", DIRECT: "✅ Direct" };

export default async function ReviewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const [{ count }, locale, pageParam] = await Promise.all([db.review.count({ where: { isActive: true } }).then((count) => ({ count })), getLocale(), searchParams]);
  const pageSize = 12; const page = Math.max(1, Number.parseInt(pageParam.page ?? "1", 10) || 1); const pageCount = Math.max(1, Math.ceil(count / pageSize));
  const reviews = await db.review.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" }, take: pageSize, skip: (page - 1) * pageSize });
  const thai = locale === "th";
  return <div className="min-h-screen bg-[#0b2a2f] py-16 text-[#f3eadb] md:py-20"><div className="mx-auto max-w-6xl px-5 md:px-8"><h1 className="mb-3 text-center text-5xl">{thai ? "รีวิวจากผู้เดินทาง" : "Customer Reviews"}</h1><p className="mb-10 text-center text-sm text-[#f3eadb]/60">{thai ? "ได้รับความไว้วางใจจากนักเดินทางทั่วโลก ⭐" : "Trusted by over 1,000+ travelers worldwide ⭐"}</p><div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{reviews.map((review) => <article key={review.reviewsId} className="flex flex-col rounded-2xl border border-[#f3eadb]/10 bg-[#102326] p-5"><div className="mb-3 flex items-center justify-between"><div><p className="text-sm font-semibold">{review.reviewerName}</p><p className="text-xs text-[#f3eadb]/50">{SOURCE_LABELS[review.source] ?? review.source}</p></div><span className="text-[#e46d52]">{"★".repeat(review.rating)}</span></div><p className="flex-1 text-sm leading-relaxed text-[#f3eadb]/75">{thai ? (review.reviewTextTh ?? "รีวิวจากผู้เดินทาง") : review.reviewText}</p></article>)}</div><div className="mt-8 flex justify-center gap-3 text-sm">{page > 1 && <Link className="rounded-full border border-[#f3eadb]/20 px-4 py-2" href={`/reviews?page=${page - 1}`}>{thai ? "ก่อนหน้า" : "Previous"}</Link>}<span className="px-3 py-2 text-[#f3eadb]/60">{thai ? `หน้า ${page} จาก ${pageCount}` : `Page ${page} of ${pageCount}`}</span>{page < pageCount && <Link className="rounded-full border border-[#f3eadb]/20 px-4 py-2" href={`/reviews?page=${page + 1}`}>{thai ? "ถัดไป" : "Next"}</Link>}</div></div></div>;
}
