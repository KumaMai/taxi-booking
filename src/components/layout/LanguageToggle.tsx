"use client";

import { useRouter } from "next/navigation";
type Locale = "en" | "th";
const LOCALE_COOKIE = "taxi_locale";

export default function LanguageToggle({ locale = "en", onChange }: { locale?: Locale; onChange?: (locale: Locale) => void }) {
  const router = useRouter();
  const switchLocale = (nextLocale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    onChange?.(nextLocale);
    router.refresh();
  };

  return <div className="flex items-center gap-1 rounded-full border border-[#f3eadb]/15 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.16em]"><button type="button" onClick={() => switchLocale("en")} className={locale === "en" ? "text-[#f3eadb]" : "text-[#d9cbb8]"} aria-pressed={locale === "en"}>EN</button><span className="text-[#d9cbb8]/50">/</span><button type="button" onClick={() => switchLocale("th")} className={locale === "th" ? "text-[#f3eadb]" : "text-[#d9cbb8]"} aria-pressed={locale === "th"}>TH</button></div>;
}
