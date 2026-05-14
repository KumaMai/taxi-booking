import type { Review } from "@prisma/client";

interface Props {
  reviews: Review[];
}

const SOURCE_LABELS: Record<string, string> = {
  TRIPADVISOR: "🌿 TripAdvisor",
  GOOGLE: "🔍 Google",
  FACEBOOK: "📘 Facebook",
  DIRECT: "✅ Direct",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-[#d4af37]" : "text-white/20"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection({ reviews }: Props) {
  return (
    <section className="bg-[#0a1628] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-[#d4af37] font-bold text-2xl md:text-3xl mb-2">
          What Our Customers Say
        </h2>
        <p className="text-center text-white/50 text-sm mb-10">
          Trusted by over 1,000 travelers ⭐
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.reviewsId}
              className="bg-[#0f2040] border border-white/10 rounded-2xl p-5 hover:border-[#d4af37]/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-medium text-sm">
                    {r.reviewerName}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {SOURCE_LABELS[r.source] ?? r.source}
                  </p>
                </div>
                <StarRating rating={r.rating} />
              </div>
              <p className="text-white/65 text-sm leading-relaxed">
                {r.reviewText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
