import { db } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | Time Taxi Khaolak",
};

const SOURCE_LABELS: Record<string, string> = {
  TRIPADVISOR: "🌿 TripAdvisor",
  GOOGLE: "🔍 Google",
  FACEBOOK: "📘 Facebook",
  DIRECT: "✅ Direct",
};

export default async function ReviewsPage() {
  const reviews = await db.review.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#0a1628] py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-center text-[#d4af37] font-bold text-3xl mb-2">
          Customer Reviews
        </h1>
        <p className="text-center text-white/50 text-sm mb-10">
          Trusted by over 1,000+ travelers worldwide ⭐
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.reviewsId}
              className="bg-[#0f2040] border border-white/10 rounded-2xl p-5 hover:border-[#d4af37]/30 transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white font-semibold text-sm">
                    {r.reviewerName}
                  </p>
                  <p className="text-white/40 text-xs">
                    {SOURCE_LABELS[r.source] ?? r.source}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < r.rating
                          ? "text-[#d4af37] text-sm"
                          : "text-white/15 text-sm"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed flex-1">
                {r.reviewText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
