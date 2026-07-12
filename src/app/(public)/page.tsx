import { db } from "@/lib/db";
import HeroSection from "@/components/home/HeroSection";
import VehicleCards from "@/components/home/VehicleCards";
import ReviewsSection from "@/components/home/ReviewsSection";
import FaqAccordion from "@/components/home/FaqAccordion";
import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Time Taxi Khaolak | Private Transfers Phuket & Khao Lak",
  description:
    "Private Taxi & Airport Transfers in Khao Lak and Phuket. Reliable, English-speaking drivers. Pay after trip — no deposit required.",
};

async function getHomeData() {
  const [reviews, faqCategories, settings] = await Promise.all([
    db.review.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    db.faqCategory.findMany({
      where: { isActive: true },
      include: {
        faqs: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    }),
    getSettings(),
  ]);
  return { reviews, faqCategories, settings };
}

export default async function HomePage() {
  const [{ reviews, faqCategories, settings }, locale] = await Promise.all([getHomeData(), getLocale()]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "TaxiService", name: "Time Taxi Khaolak", url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000", areaServed: ["Khao Lak", "Phuket", "Phang Nga"], serviceType: "Private airport transfer", priceRange: "฿฿" }) }} />
      <HeroSection settings={settings} locale={locale} />
      <VehicleCards locale={locale} />
      <ReviewsSection reviews={reviews} locale={locale} />
      <FaqAccordion categories={faqCategories} locale={locale} />
    </>
  );
}
