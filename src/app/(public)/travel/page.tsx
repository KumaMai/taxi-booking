import { db } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Travel Recommendations | Time Taxi Khaolak",
};

export default async function TravelPage() {
  const attractions = await db.attraction.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="min-h-screen bg-[#0a1628] py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-center text-[#d4af37] font-bold text-3xl mb-2">
          Travel Recommendations
        </h1>
        <p className="text-center text-white/50 text-sm mb-10">
          Explore the best destinations around Khao Lak and Southern Thailand
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {attractions.map((a) => (
            <div
              key={a.attractionsId}
              className="bg-[#0f2040] border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/30 transition-colors group"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-[#1a3a5c] to-[#0a1628] flex items-center justify-center">
                <span className="text-4xl">🏝️</span>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#d4af37] transition-colors">
                  {a.nameEn}
                </h3>
                <p className="text-white/40 text-xs mb-2">{a.nameTh}</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {a.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
