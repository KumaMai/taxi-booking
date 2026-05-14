import { db } from "@/lib/db";
import PriceZoneTable from "@/components/price/PriceZoneTable";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-static"; // SSG

export const metadata: Metadata = {
  title: "Price List | Time Taxi Khaolak",
  description:
    "Transfer price list from Khao Lak and Phuket Airport to all major destinations.",
};

async function getPriceData() {
  return db.priceZone.findMany({
    where: { isActive: true },
    include: {
      routes: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { sortOrder: "asc" },
  });
}

export default async function PriceListPage() {
  const zones = await getPriceData();

  return (
    <div className="min-h-screen bg-[#0a1628] py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-center text-[#d4af37] font-bold text-2xl md:text-3xl mb-2 tracking-wide">
          PRICE LIST — TIME TAXI KHAOLAK
        </h1>
        <p className="text-center text-white/50 text-sm mb-10">
          All prices in Thai Baht (THB) — reference prices only
        </p>

        {/* Zone Tables */}
        {zones.map((zone) => (
          <PriceZoneTable key={zone.priceZonesId} zone={zone} />
        ))}

        {/* Note + CTA */}
        <div className="mt-8 bg-[#0f2040] border border-[#d4af37]/20 rounded-2xl p-6 text-center">
          <p className="text-white/60 text-sm mb-4">
            Prices above are reference rates. Actual fares may vary by
            pick-up/drop-off location and travel time.
            <br />
            For the best offer, feel free to message us on WhatsApp.
          </p>
          <a
            href="https://wa.me/66986822951"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20bc5a] text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            <span>📱</span> +66 98 6822951
          </a>
        </div>

        {/* Book CTA */}
        <div className="text-center mt-8">
          <Link
            href="/booking"
            className="bg-[#d4af37] hover:bg-[#f4c430] text-[#0a1628] font-bold px-8 py-4 rounded-full transition-colors"
          >
            Book Your Transfer Now
          </Link>
        </div>
      </div>
    </div>
  );
}
