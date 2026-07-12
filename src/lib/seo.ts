import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";

const SITE_NAME = "Time Taxi Khaolak";

export function localizedMetadata(
  locale: Locale,
  path: string,
  copy: { titleEn: string; titleTh: string; descriptionEn: string; descriptionTh: string },
): Metadata {
  const title = locale === "th" ? copy.titleTh : copy.titleEn;
  const description = locale === "th" ? copy.descriptionTh : copy.descriptionEn;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, locale: locale === "th" ? "th_TH" : "en_TH", type: "website" },
  };
}
