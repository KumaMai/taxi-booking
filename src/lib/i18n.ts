import type { Locale } from "./locale";

export const NAV_COPY = [
  { href: "/booking", en: "Booking", th: "จองรถ" },
  { href: "/price-list", en: "Price List", th: "ราคา" },
  { href: "/travel", en: "Travel Recommendations", th: "สถานที่ท่องเที่ยว" },
  { href: "/qa", en: "Q&A", th: "คำถามที่พบบ่อย" },
  { href: "/reviews", en: "Reviews", th: "รีวิว" },
  { href: "/contact", en: "Contact Me", th: "ติดต่อเรา" },
  { href: "/about", en: "About Us", th: "เกี่ยวกับเรา" },
] as const;

export const COMMON_COPY = { bookRide: { en: "Book a ride", th: "จองรถ" }, toggleMenu: { en: "Toggle menu", th: "เปิดเมนู" }, previous: { en: "Previous", th: "ก่อนหน้า" }, next: { en: "Next", th: "ถัดไป" } } as const;
export function copy(locale: Locale, value: { en: string; th: string }): string { return locale === "th" ? value.th : value.en; }
