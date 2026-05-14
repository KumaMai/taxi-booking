import Link from "next/link";

const VEHICLES = [
  {
    type: "Standard",
    emoji: "🚗",
    passengers: "1-2",
    luggage: "2 bags",
    price: "1,200",
    desc: "Sedan — comfortable for couples or solo travelers",
    color: "#378ADD",
  },
  {
    type: "SUV",
    emoji: "🚙",
    passengers: "1-4",
    luggage: "4 bags",
    price: "1,300",
    desc: "SUV — spacious for families or small groups",
    color: "#d4af37",
    featured: true,
  },
  {
    type: "Van",
    emoji: "🚐",
    passengers: "1-9",
    luggage: "8+ bags",
    price: "1,400",
    desc: "Van — perfect for large groups with lots of luggage",
    color: "#0F6E56",
  },
];

export default function VehicleCards() {
  return (
    <section className="bg-[#0f2040] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-[#d4af37] font-bold text-2xl md:text-3xl mb-2">
          Vehicle Types
        </h2>
        <p className="text-center text-white/50 text-sm mb-10">
          All vehicles are clean, fully insured, and driven by English-speaking
          professionals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {VEHICLES.map((v) => (
            <div
              key={v.type}
              className={`relative bg-[#0a1628] border rounded-2xl p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-1 ${
                v.featured
                  ? "border-[#d4af37] shadow-lg shadow-[#d4af37]/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {v.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0a1628] text-[10px] font-bold px-3 py-0.5 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="text-5xl mb-4">{v.emoji}</div>
              <h3 className="text-white font-bold text-xl mb-1">{v.type}</h3>

              <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                <span>👤 {v.passengers} pax</span>
                <span>🧳 {v.luggage}</span>
              </div>

              <p className="text-white/50 text-xs mb-4">{v.desc}</p>

              <div className="mt-auto">
                <p className="text-white/40 text-xs mb-1">Starting from</p>
                <p className="text-2xl font-bold" style={{ color: v.color }}>
                  {v.price}{" "}
                  <span className="text-sm font-normal text-white/50">THB</span>
                </p>
              </div>

              <Link
                href="/booking"
                className="mt-4 w-full py-2.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  background: v.featured ? "#d4af37" : "transparent",
                  color: v.featured ? "#0a1628" : "#d4af37",
                  border: v.featured ? "none" : "1px solid #d4af37",
                }}
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
