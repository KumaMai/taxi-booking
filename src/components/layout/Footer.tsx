import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/booking", label: "Booking" },
  { href: "/price-list", label: "Price List" },
  { href: "/travel", label: "Travel Recommendations" },
  { href: "/qa", label: "Q&A" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Me" },
  { href: "/about", label: "About Us" },
];

export default function Footer() {
  return (
    <footer className="bg-[#020b18] border-t border-[#d4af37]/15 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left — Contact */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
              <span className="text-[#d4af37] font-bold text-[9px] text-center leading-tight">
                TIME
                <br />
                TAXI
              </span>
            </div>
            <div>
              <p className="text-[#d4af37] font-semibold text-sm">
                Time Taxi Khao Lak
              </p>
              <p className="text-white/40 text-xs">
                Private Airport Transfer Service
              </p>
            </div>
          </div>
          <div className="space-y-1.5 text-sm text-white/60">
            <p>📱 WhatsApp: +66 9868 22951</p>
            <p>💬 Line: 0986822951</p>
            <p>📞 Tel: 0986822951</p>
            <p>✉️ Email: timetaxikhaolak@gmail.com</p>
            <p>📘 Facebook: Time Taxi Khao Lak</p>
          </div>
        </div>

        {/* Center — TripAdvisor */}
        <div className="flex flex-col items-center">
          <p className="text-white/40 text-xs mb-3">TripAdvisor</p>
          <div className="bg-[#00aa6c] rounded px-5 py-3 text-center">
            <p className="text-white text-[10px] font-medium">RECOMMENDED ON</p>
            <p className="text-white font-bold text-sm">TripAdvisor</p>
            <p className="text-white/80 text-[10px]">Time Taxi Khaolak</p>
          </div>
        </div>

        {/* Right — Description */}
        <div>
          <p className="text-[#d4af37] font-semibold text-sm mb-3">
            TimeTaxiKhaolak
          </p>
          <p className="text-white/55 text-xs leading-relaxed">
            We are ready to serve you 24 hours a day, every day. No matter where
            you are, you won&apos;t miss any journey. Our drivers are
            experienced and knowledgeable, providing professional service that
            ensures your trip to your destination is convenient and excellent.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-3">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/35 hover:text-[#d4af37] text-xs transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-white/25 text-xs">
            © 2025 Time Taxi Khaolak
          </p>
        </div>
      </div>
    </footer>
  );
}
