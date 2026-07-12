import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getSettings, type PublicSettings } from "@/lib/settings";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata(await getLocale(), "/contact", { titleEn: "Contact | Time Taxi Khaolak", titleTh: "ติดต่อเรา | Time Taxi Khaolak", descriptionEn: "Contact Time Taxi Khaolak by phone, WhatsApp, LINE, Facebook, or email.", descriptionTh: "ติดต่อ Time Taxi Khaolak ผ่านโทรศัพท์ WhatsApp LINE Facebook หรืออีเมล" });
}

function buildContacts(settings: PublicSettings, thai: boolean) {
  return [
    { icon: "📱", label: "WhatsApp", value: settings.whatsapp, href: `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`, cta: thai ? "แชทตอนนี้" : "Chat Now" },
    { icon: "💬", label: "LINE", value: settings.lineId, href: `https://line.me/ti/p/~${encodeURIComponent(settings.lineId)}`, cta: thai ? "เพิ่ม LINE" : "Add LINE" },
    { icon: "📞", label: thai ? "โทรศัพท์" : "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/[^0-9+]/g, "")}`, cta: thai ? "โทรตอนนี้" : "Call Now" },
    { icon: "✉️", label: "Email", value: settings.email, href: `mailto:${settings.email}`, cta: thai ? "ส่งอีเมล" : "Send Email" },
    { icon: "📘", label: "Facebook", value: settings.facebookPage, href: "https://facebook.com", cta: thai ? "ส่งข้อความ" : "Message" },
    { icon: "📍", label: thai ? "ที่ตั้ง" : "Location", value: settings.location, href: "https://maps.google.com", cta: thai ? "ดูแผนที่" : "View Map" },
  ];
}

export default async function ContactPage() {
  const [settings, locale] = await Promise.all([getSettings(), getLocale()]);
  const thai = locale === "th";
  const contacts = buildContacts(settings, thai);
  return <div className="min-h-screen bg-[#f3eadb] py-16 text-[#102326] md:py-20"><div className="mx-auto max-w-4xl px-5 md:px-8"><h1 className="mb-3 text-center text-5xl text-[#102326]">{thai ? "ติดต่อเรา" : "Contact Me"}</h1><p className="mb-10 text-center text-sm text-[#102326]/55">{thai ? "พร้อมให้บริการตลอด 24 ชั่วโมง ตอบกลับภายใน 1 นาที" : "We are ready to serve you 24/7 — reply within 1 minute"}</p><div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">{contacts.map((c) => <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center gap-4 rounded-[1.25rem] border border-[#102326]/15 bg-[#eadfce] p-5 transition-colors hover:border-[#e46d52]"><div className="text-3xl">{c.icon}</div><div className="flex-1"><p className="text-sm font-medium text-[#e46d52]">{c.label}</p><p className="text-xs text-[#102326]/60">{c.value}</p></div><span className="text-xs text-[#102326]/50 transition-colors group-hover:text-[#e46d52]">{c.cta} <span aria-hidden="true">→</span></span></a>)}</div><div className="text-center"><a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#25d366] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#20bc5a]">📱 {thai ? "แชทผ่าน WhatsApp" : "Chat on WhatsApp"} {settings.whatsapp}</a></div></div></div>;
}
