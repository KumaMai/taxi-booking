"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/booking", label: "Booking" },
  { href: "/price-list", label: "Price List" },
  { href: "/travel", label: "Travel Recommendations" },
  { href: "/qa", label: "Q&A" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Me" },
  { href: "/about", label: "About Us" },
];

const SOCIAL = [
  { href: "https://line.me/ti/p/~@timetaxikhaolak", label: "LINE" },
  { href: "mailto:timetaxikhaolak@gmail.com", label: "✉" },
  { href: "https://wa.me/66986822951", label: "WA" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0a1628] border-b border-[#d4af37]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-11 h-11 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
            <span className="text-[#d4af37] font-bold text-xs leading-tight text-center">
              TIME
              <br />
              TAXI
            </span>
          </div>
          <span className="text-[#d4af37] font-bold text-xs leading-tight hidden sm:block">
            TIME TAXI
            <br />
            <span className="text-white/60 font-normal">KHAOLAK</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/75 hover:text-[#d4af37] text-xs px-2.5 py-1.5 rounded transition-colors whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Social Icons + Language */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#0f2040] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#d4af37] hover:border-[#d4af37]/40 text-xs transition-colors"
            >
              {s.label}
            </a>
          ))}
          <div className="flex items-center gap-1">
            <button className="text-xs text-[#d4af37] font-medium">TH</button>
            <span className="text-white/30 text-xs">/</span>
            <button className="text-xs text-white/50 hover:text-white/80">
              EN
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white/80 hover:text-[#d4af37] transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#0f2040] border-t border-[#d4af37]/20">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-3 text-white/75 hover:text-[#d4af37] hover:bg-[#1a3a5c]/40 border-b border-white/5 text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 px-5 py-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#d4af37] text-sm"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
