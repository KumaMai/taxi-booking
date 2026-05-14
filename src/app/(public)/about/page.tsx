import type { Metadata } from "next";
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Us | Time Taxi Khaolak",
};

const SERVICES = [
  {
    icon: "🚗",
    title: "Private Van with Driver",
    desc: "For sightseeing, transfers, and custom tours around Khao Lak, Phuket & nearby areas.",
  },
  {
    icon: "✈️",
    title: "Airport Transfers",
    desc: "Pick-up and drop-off service to/from Phuket International Airport.",
  },
  {
    icon: "☀️",
    title: "Private Day Trips & Tours",
    desc: "Explore highlights like Samet Nangshe, Similan Islands, and Surin Islands.",
  },
  {
    icon: "🕐",
    title: "Advance & Long-Term Booking",
    desc: "Available for daily, weekly, or multi-day travel plans.",
  },
];

const WHY = [
  "Friendly, professional, English-speaking drivers",
  "Clean, spacious, and fully insured vehicles",
  "Transparent pricing — no hidden fees",
  "24/7 service availability",
  "Easy booking via Website, LINE, WhatsApp, or Facebook",
  "Reliable, safe, and customer-focused team",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-[#d4af37] font-bold text-3xl mb-4">
            — About Us —
          </h1>
          <div className="bg-[#0f2040] border border-[#d4af37]/20 rounded-2xl p-8 text-left">
            <h2 className="text-[#d4af37] font-semibold text-lg mb-3">
              🚗 Time Taxi Khaolak — Your Private Driver Service in Paradise
            </h2>
            <p className="text-white/80 font-medium mb-4">
              Welcome to Time Taxi Khaolak — a trusted private van rental with
              driver service based in Khao Lak, Phuket, and Phang Nga.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              We are dedicated to providing you with safe, comfortable, and
              reliable transportation for all your travel needs. Our
              professional English-speaking drivers ensure every trip is smooth,
              enjoyable, and on time. All our vehicles are clean,
              well-maintained, and fully insured for your peace of mind.
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Whether you&apos;re heading to the airport, exploring local
              attractions, or simply enjoying a peaceful escape in Southern
              Thailand, Time Taxi Khaolak is here to take you there with comfort
              and care.
            </p>
          </div>
        </div>

        {/* Services */}
        <h2 className="text-center text-[#d4af37] font-bold text-2xl mb-6">
          🌴 Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-[#0f2040] border border-white/10 rounded-xl p-5 hover:border-[#d4af37]/30 transition-colors"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-2">
                {s.title}
              </h3>
              <p className="text-white/55 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#0f2040] border border-[#d4af37]/20 rounded-2xl p-8 mb-10">
          <h2 className="text-[#d4af37] font-bold text-xl mb-5 text-center">
            💎 Why Choose Us
          </h2>
          <div className="space-y-2">
            {WHY.map((w) => (
              <div
                key={w}
                className="flex items-center gap-3 text-white/70 text-sm"
              >
                <span className="text-[#d4af37] text-xs">✓</span>
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-[#0f2040] rounded-2xl p-8 border border-[#d4af37]/20">
          <h2 className="text-[#d4af37] font-bold text-xl mb-5">
            📬 Contact Us
          </h2>
          <div className="space-y-2 text-sm text-white/70">
            <p>📞 Phone: +66 986 822 951</p>
            <p>💬 LINE: @timetaxikhaolak</p>
            <p>📱 WhatsApp: +66 986 822 951</p>
            <p>✉️ Email: timetaxikhaolak@gmail.com</p>
            <p>📍 Location: Khao Lak, Phang Nga, Thailand</p>
          </div>
        </div>
      </div>
    </div>
  );
}
