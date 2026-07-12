import { cookies } from "next/headers";

export type Locale = "en" | "th";
export const LOCALE_COOKIE = "taxi_locale";

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return value === "th" ? "th" : "en";
}

export function localizedValue(locale: Locale, english: string, thai: string): string {
  return locale === "th" && thai.trim() ? thai : english;
}
