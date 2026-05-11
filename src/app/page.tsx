export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-5xl font-bold text-[#d4af37]">Time Taxi Khaolak</h1>

      <p className="text-white/70 text-lg">
        Private Transfers — Phuket & Khao Lak
      </p>

      <div className="bg-[#d4af37] text-[#0a1628] px-6 py-2 rounded-full font-medium">
        Pay After Trip — No Deposit Required
      </div>

      <div className="flex gap-4 mt-4">
        {["Sedan", "SUV", "Van"].map((v) => (
          <div
            key={v}
            className="border border-[#d4af37]/30 bg-[#0f2040] rounded-xl p-6 text-center hover:border-[#d4af37] transition-colors cursor-pointer"
          >
            <p className="text-[#d4af37] font-medium text-lg">{v}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
