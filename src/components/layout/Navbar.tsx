"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { PublicSettings } from "@/lib/settings";
import type { Locale } from "@/lib/locale";
import { COMMON_COPY, NAV_COPY, copy } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

interface NavbarProps {
  settings: PublicSettings;
  locale?: Locale;
}

export default function Navbar({ settings, locale = "en" }: NavbarProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);
  const social = [
    { href: `https://line.me/ti/p/~${encodeURIComponent(settings.lineId)}`, label: "LINE" },
    { href: `mailto:${settings.email}`, label: "✉" },
    { href: `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`, label: "WA" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#f3eadb]/10 bg-[#0b2a2f]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e46d52]"><span className="text-center text-[9px] font-semibold leading-tight tracking-[0.16em] text-[#f3eadb]">TIME<br />TAXI</span></div>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3eadb] sm:block">Time Taxi <span className="text-[#e46d52]">Khao Lak</span></span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">{NAV_COPY.map((item) => <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#d9cbb8] hover:bg-[#f3eadb]/10 hover:text-[#f3eadb]">{copy(currentLocale, item)}</Link>)}</div>
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {social.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f3eadb]/15 bg-[#102326] text-[10px] font-semibold text-[#d9cbb8]">{item.label}</a>)}
          <LanguageToggle locale={currentLocale} onChange={setCurrentLocale} />
          <Link href="/booking" className="rounded-full bg-[#e46d52] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#102326]">{copy(currentLocale, COMMON_COPY.bookRide)}</Link>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="rounded-full border border-[#f3eadb]/15 p-2 text-[#f3eadb] lg:hidden" aria-label={copy(currentLocale, COMMON_COPY.toggleMenu)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && <div className="border-t border-[#f3eadb]/10 bg-[#102326] lg:hidden">
        {NAV_COPY.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-[#f3eadb]/10 px-5 py-3.5 text-sm text-[#d9cbb8]">{copy(currentLocale, item)}</Link>)}
        <div className="flex items-center gap-4 px-5 py-4">
          {social.map((item) => <a key={item.label} href={item.href} className="text-sm text-[#d9cbb8]">{item.label}</a>)}
          <LanguageToggle locale={currentLocale} onChange={setCurrentLocale} />
          <Link href="/booking" onClick={() => setOpen(false)} className="ml-auto rounded-full bg-[#e46d52] px-4 py-2 text-xs font-bold text-[#102326]">{copy(currentLocale, COMMON_COPY.bookRide)}</Link>
        </div>
      </div>}
    </nav>
  );
}
