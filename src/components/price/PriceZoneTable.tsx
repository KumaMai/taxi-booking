import type { PriceZone, PriceRoute } from "@prisma/client";

type ZoneWithRoutes = PriceZone & { routes: PriceRoute[] };

export default function PriceZoneTable({ zone }: { zone: ZoneWithRoutes }) {
  return (
    <div className="mb-8">
      {/* Zone header */}
      <div className="bg-[#1a3a5c] border border-[#d4af37]/30 rounded-t-xl px-5 py-3">
        <h3 className="text-[#d4af37] font-bold text-center text-sm tracking-widest uppercase">
          {zone.nameEn}
        </h3>
      </div>

      {/* Table */}
      <div className="border border-[#d4af37]/20 border-t-0 rounded-b-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 bg-[#0f2040] text-white/60 text-xs font-medium">
          <div className="col-span-1 px-3 py-2.5">From</div>
          <div className="col-span-1 px-3 py-2.5">To</div>
          <div className="px-3 py-2.5 text-center">
            🚗 Standard
            <br />
            <span className="text-[10px] font-normal">(1-2 pax)</span>
          </div>
          <div className="px-3 py-2.5 text-center">
            🚙 SUV
            <br />
            <span className="text-[10px] font-normal">(1-4 pax)</span>
          </div>
          <div className="px-3 py-2.5 text-center">
            🚐 Van
            <br />
            <span className="text-[10px] font-normal">(1-9 pax)</span>
          </div>
        </div>

        {/* Rows */}
        {zone.routes.map((route, i) => (
          <div
            key={route.priceRoutesId}
            className={`grid grid-cols-5 text-sm border-t border-white/5 ${
              i % 2 === 0 ? "bg-[#0a1628]" : "bg-[#0d1e35]"
            }`}
          >
            <div className="col-span-1 px-3 py-2.5 text-white/70">
              {route.fromEn}
            </div>
            <div className="col-span-1 px-3 py-2.5 text-white/90 font-medium">
              {route.toEn}
            </div>
            <div className="px-3 py-2.5 text-center text-white/80">
              {route.priceStandard.toLocaleString()}
            </div>
            <div className="px-3 py-2.5 text-center text-white/80">
              {route.priceSuv.toLocaleString()}
            </div>
            <div className="px-3 py-2.5 text-center text-[#d4af37] font-medium">
              {route.priceVan.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
