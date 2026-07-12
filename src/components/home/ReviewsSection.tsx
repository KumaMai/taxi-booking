import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import type { Review } from "@prisma/client";
import type { Locale } from "@/lib/locale";

interface Props { reviews: Review[]; locale?: Locale }
const SOURCE_LABELS: Record<string, string> = { TRIPADVISOR: "Tripadvisor", GOOGLE: "Google", FACEBOOK: "Facebook", DIRECT: "Direct" };
function Stars({ rating }: { rating: number }) { return <span aria-label={`${rating} out of 5 stars`} className="tracking-[0.18em] text-[#e46d52]">{"★".repeat(rating)}<span className="text-[#f3eadb]/20">{"★".repeat(Math.max(0, 5 - rating))}</span></span>; }

export default function ReviewsSection({ reviews, locale = "en" }: Props) {
  const thai = locale === "th";
  return <section className="bg-[#0b2a2f] py-20 md:py-24"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="mb-11 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#79b8a7]">{thai ? "เสียงจากผู้เดินทาง" : "Good company"}</p><h2 className="max-w-xl text-4xl leading-tight text-[#f3eadb] sm:text-5xl">{thai ? "การเดินทางที่ดีคือส่วนหนึ่งของทริป" : "The ride is part of the trip."}</h2></div><Link href="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-[#e46d52] hover:text-[#f3eadb]">{thai ? "อ่านรีวิวทั้งหมด" : "Read all notes"} <ArrowUpRight size={16} /></Link></div><div className="grid gap-4 lg:grid-cols-3">{reviews.slice(0, 3).map((review) => <article key={review.reviewsId} className="relative rounded-[1.5rem] border border-[#f3eadb]/15 bg-[#102326] p-6"><Quote size={24} className="mb-8 text-[#e46d52]" /><p className="min-h-28 text-lg leading-8 text-[#f3eadb]">“{thai ? (review.reviewTextTh ?? "รีวิวจากผู้เดินทาง") : review.reviewText}”</p><div className="mt-7 flex items-end justify-between border-t border-[#f3eadb]/10 pt-4 text-xs"><div><p className="font-semibold text-[#f3eadb]">{review.reviewerName || (thai ? "ผู้เดินทางไม่ระบุชื่อ" : "Anonymous traveller")}</p><p className="mt-1 text-[#d9cbb8]">{SOURCE_LABELS[review.source] ?? review.source}</p></div><Stars rating={review.rating} /></div></article>)}</div></div></section>;
}
