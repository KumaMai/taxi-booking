import type { Metadata } from "next";
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact Me | Time Taxi Khaolak",
};

const CONTACTS = [
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+66 986 822 951",
    href: "https://wa.me/66986822951",
    cta: "Chat Now",
  },
  {
    icon: "💬",
    label: "LINE",
    value: "@timetaxikhaolak",
    href: "https://line.me/ti/p/~@timetaxikhaolak",
    cta: "Add LINE",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "0986822951",
    href: "tel:0986822951",
    cta: "Call Now",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "timetaxikhaolak@gmail.com",
    href: "mailto:timetaxikhaolak@gmail.com",
    cta: "Send Email",
  },
  {
    icon: "📘",
    label: "Facebook",
    value: "Time Taxi Khao Lak",
    href: "https://facebook.com",
    cta: "Message",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Khao Lak, Phang Nga, Thailand",
    href: "https://maps.google.com",
    cta: "View Map",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-center text-[#d4af37] font-bold text-3xl mb-2">
          Contact Me
        </h1>
        <p className="text-center text-white/50 text-sm mb-10">
          We are ready to serve you 24/7 — reply within 1 minute
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="bg-[#0f2040] border border-white/10 rounded-2xl p-5 hover:border-[#d4af37]/40 transition-colors flex items-center gap-4 group"
            >
              <div className="text-3xl">{c.icon}</div>
              <div className="flex-1">
                <p className="text-[#d4af37] font-medium text-sm">{c.label}</p>
                <p className="text-white/60 text-xs">{c.value}</p>
              </div>
              <span className="text-[#d4af37]/60 group-hover:text-[#d4af37] text-xs transition-colors">
                {c.cta} →
              </span>
            </a>
          ))}
        </div>

        {/* Big WhatsApp CTA */}
        <div className="text-center">
          <a
            href="https://wa.me/66986822951"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25d366] hover:bg-[#20bc5a] text-white font-bold text-lg px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            📱 Chat on WhatsApp +66 98 6822951
          </a>
        </div>
      </div>
    </div>
  );
}
