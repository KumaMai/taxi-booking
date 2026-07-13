import Link from "next/link";
import type { PublicSettings } from "@/lib/settings";
import type { Locale } from "@/lib/locale";

const FOOTER_LINKS = [
  ["/booking", "Booking", "จองรถ"],
  ["/price-list", "Price List", "ราคา"],
  ["/travel", "Travel Recommendations", "สถานที่ท่องเที่ยว"],
  ["/qa", "Q&A", "คำถามที่พบบ่อย"],
  ["/reviews", "Reviews", "รีวิว"],
  ["/contact", "Contact Me", "ติดต่อเรา"],
  ["/about", "About Us", "เกี่ยวกับเรา"],
] as const;

export default function Footer({ settings: s, locale = "en" }: { settings: PublicSettings; locale?: Locale }) {
  const thai = locale === "th";
  return (
    <footer className="site-footer mt-auto border-t border-[#102326]/10 bg-[#eadfce] text-[#102326]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-[1.1fr_.8fr_1fr] md:px-8">
        <div>
          <div className="mb-5 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e46d52]"><span className="text-center text-[8px] font-semibold leading-tight tracking-[0.12em] text-[#f3eadb]">TIME<br />TAXI</span></div><div><p className="text-sm font-semibold text-[#f3eadb]">Time Taxi Khao Lak</p><p className="text-xs text-[#d9cbb8]">{thai ? "บริการรถรับส่งสนามบินส่วนตัว" : "Private Airport Transfer Service"}</p></div></div>
          <div className="space-y-1.5 text-sm text-[#d9cbb8]"><p>📱 WhatsApp: {s.whatsapp}</p><p>💬 LINE: {s.lineId}</p><p>📞 {thai ? "โทร" : "Tel"}: {s.phone}</p><p>✉️ Email: {s.email}</p><p>📘 Facebook: {s.facebookPage}</p></div>
        </div>
        <div className="flex flex-col items-center"><p className="mb-3 text-xs text-[#d9cbb8]">Tripadvisor</p><div className="rounded bg-[#79b8a7] px-5 py-3 text-center text-[#102326]"><p className="text-[10px] font-medium">RECOMMENDED ON</p><p className="text-sm font-bold">Tripadvisor</p><p className="text-[10px] opacity-70">Time Taxi Khaolak</p></div></div>
        <div><p className="mb-3 text-sm font-semibold text-[#e46d52]">TimeTaxiKhaolak</p><p className="text-xs leading-relaxed text-[#d9cbb8]">{thai ? "พร้อมให้บริการทุกวันตลอด 24 ชั่วโมง ดูแลการเดินทางของคุณด้วยคนขับท้องถิ่นที่มีประสบการณ์" : "We are ready to serve you 24 hours a day. Our experienced local drivers provide a convenient, reliable journey."}</p></div>
      </div>
      <div className="border-t border-[#f3eadb]/10 py-5"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="mb-3 flex flex-wrap justify-center gap-x-4 gap-y-1">{FOOTER_LINKS.map(([href, label, labelTh]) => <Link key={href} href={href} className="text-xs text-[#d9cbb8]/70 transition-colors hover:text-[#e46d52]">{thai ? labelTh : label}</Link>)}</div><p className="text-center text-xs text-[#d9cbb8]/45">© {new Date().getFullYear()} Time Taxi Khaolak</p></div></div>
    </footer>
  );
}
