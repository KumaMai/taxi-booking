import { db } from "@/lib/db";
import HeroSection from "@/components/home/HeroSection";
import VehicleCards from "@/components/home/VehicleCards";
import ReviewsSection from "@/components/home/ReviewsSection";
import FaqAccordion from "@/components/home/FaqAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Taxi Khaolak | Private Transfers Phuket & Khao Lak",
  description:
    "Private Taxi & Airport Transfers in Khao Lak and Phuket. Reliable, English-speaking drivers. Pay after trip — no deposit required.",
};

async function getHomeData() {
  const [reviews, faqCategories] = await Promise.all([
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
  ]);
  return { reviews, faqCategories };
}

export default async function HomePage() {
  const { reviews, faqCategories } = await getHomeData();

  return (
    <>
      <HeroSection />
      <VehicleCards />
      <ReviewsSection reviews={reviews} />
      <FaqAccordion categories={faqCategories} />
    </>
  );
}
