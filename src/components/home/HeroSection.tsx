import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#0a1628] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2040] to-[#020b18] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <span className="bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm px-4 py-1.5 rounded-full">
            Pay after trip — No deposit required ✓
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-center text-white font-bold text-2xl md:text-4xl lg:text-5xl leading-tight mb-6 max-w-4xl mx-auto">
          Taxi Phuket Airport to Khaolak
          <br />
          <span className="text-[#d4af37]">or</span> Taxi Khaolak to Phuket
          Airport <span className="text-[#d4af37]">International</span>
          <br />
          <span className="text-xl md:text-2xl font-normal text-white/70">
            — Private Transfer 24/7
          </span>
        </h1>

        {/* CTA Button */}
        <div className="flex justify-center mb-10">
          <Link
            href="/booking"
            className="bg-[#d4af37] hover:bg-[#f4c430] text-[#0a1628] font-bold text-lg px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-[#d4af37]/25"
          >
            Booking Now
          </Link>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          {[
            {
              icon: "💬",
              label: "WhatsApp",
              value: "+66 986 822 951",
              href: "https://wa.me/66986822951",
            },
            {
              icon: "📱",
              label: "LINE",
              value: "0986822951",
              href: "https://line.me/ti/p/~@timetaxikhaolak",
            },
            {
              icon: "📞",
              label: "Phone",
              value: "0986822951",
              href: "tel:0986822951",
            },
            {
              icon: "✉️",
              label: "Email",
              value: "timetaxikhaolak@gmail.com",
              href: "mailto:timetaxikhaolak@gmail.com",
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="bg-[#0f2040] border border-[#d4af37]/20 rounded-xl p-3 text-center hover:border-[#d4af37]/50 transition-colors group"
            >
              <div className="text-xl mb-1">{c.icon}</div>
              <div className="text-[#d4af37] text-xs font-medium">
                {c.label}
              </div>
              <div className="text-white/50 text-[10px] mt-0.5 truncate">
                {c.value}
              </div>
            </a>
          ))}
        </div>

        {/* Feature points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {[
            { icon: "🚗", text: "Private taxi — no sharing" },
            { icon: "💰", text: "Pay after trip — no deposit" },
            { icon: "🕐", text: "24/7 service available" },
            { icon: "📲", text: "Book now — reply within 1 minute" },
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-2 bg-[#0f2040]/60 rounded-lg px-3 py-2"
            >
              <span className="text-base">{f.icon}</span>
              <span className="text-white/70 text-xs">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
