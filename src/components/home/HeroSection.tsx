import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, ShieldCheck } from "lucide-react";
import type { PublicSettings } from "@/lib/settings";
import type { Locale } from "@/lib/locale";

export default function HeroSection({ settings, locale = "en" }: { settings: PublicSettings; locale?: Locale }) {
  const thai = locale === "th";
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-[#0b2a2f]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(243,234,219,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(243,234,219,.2)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20 lg:py-28">
        <div>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e46d52]">
            <span className="h-px w-10 bg-[#e46d52]" /> {thai ? "ภาคใต้ ประเทศไทย เดินทางถึงหน้าประตู" : "Southern Thailand, door to door"}
          </p>
          <h1 className="max-w-2xl text-5xl leading-[0.98] text-[#f3eadb] sm:text-6xl lg:text-7xl">
            {locale === "th" ? <>เดินทางลงใต้ <em className="text-[#e46d52]">ง่ายๆ</em></> : <>Your easy way <em className="text-[#e46d52]">south.</em></>}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#d9cbb8] sm:text-lg">
            {thai ? "บริการรถรับส่งส่วนตัวระหว่างภูเก็ตและเขาหลัก พร้อมคนขับท้องถิ่น ราคาชัดเจน และไม่ต้องวางมัดจำก่อนเดินทาง" : "Private airport transfers between Phuket and Khao Lak, with a local driver, a clear price, and no deposit before you travel."}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/booking" className="group inline-flex items-center gap-3 rounded-full bg-[#e46d52] px-6 py-3.5 text-sm font-bold text-[#102326] transition-transform hover:-translate-y-0.5">
              {thai ? "วางแผนการเดินทาง" : "Plan my transfer"} <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#f3eadb]/20 px-6 py-3.5 text-sm font-medium text-[#f3eadb] transition-colors hover:border-[#e46d52] hover:text-[#e46d52]">
              {thai ? "สอบถามผ่าน WhatsApp" : "Ask on WhatsApp"}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#d9cbb8]">
            <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#79b8a7]" /> {thai ? "จ่ายหลังเดินทาง" : "Pay after trip"}</span>
            <span className="inline-flex items-center gap-2"><Clock3 size={15} className="text-[#79b8a7]" /> {thai ? "บริการ 24 ชั่วโมง" : "24/7 service"}</span>
            <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-[#79b8a7]" /> {thai ? "คนขับท้องถิ่น" : "Local drivers"}</span>
          </div>
        </div>

        <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-[#f3eadb]/15 bg-[#102326] p-5 shadow-2xl shadow-black/20 sm:min-h-[460px] sm:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e46d52]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[#79b8a7]/20 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9cbb8]">
              <span>{thai ? "เส้นทาง / 01" : "Route note / 01"}</span><span className="text-[#e46d52]">{thai ? "ชายฝั่งอันดามัน" : "Andaman coast"}</span>
            </div>
            <div className="my-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e46d52] text-[#e46d52]"><MapPin size={19} /></div>
                <div><p className="text-[10px] uppercase tracking-[0.18em] text-[#d9cbb8]">{thai ? "จาก" : "From"}</p><p className="mt-1 text-2xl text-[#f3eadb]">{thai ? "สนามบินภูเก็ต" : "Phuket Airport"}</p></div>
              </div>
              <div className="ml-6 h-20 border-l border-dashed border-[#e46d52]/60" />
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e46d52] text-[#102326]"><MapPin size={19} /></div>
                <div><p className="text-[10px] uppercase tracking-[0.18em] text-[#d9cbb8]">{thai ? "ถึง" : "To"}</p><p className="mt-1 text-2xl text-[#f3eadb]">{thai ? "เขาหลัก" : "Khao Lak"}</p></div>
              </div>
            </div>
            <div className="flex items-end justify-between border-t border-[#f3eadb]/15 pt-5">
              <div><p className="text-[10px] uppercase tracking-[0.18em] text-[#d9cbb8]">{thai ? "เริ่มต้นที่" : "Starting from"}</p><p className="mt-1 text-3xl text-[#f3eadb]">1,200 <span className="text-sm text-[#d9cbb8]">THB</span></p></div>
              <span className="rounded-full bg-[#79b8a7]/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#79b8a7]">{thai ? "รถส่วนตัว" : "Private ride"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
