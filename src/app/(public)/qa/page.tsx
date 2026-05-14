import { db } from "@/lib/db";
import FaqAccordion from "@/components/home/FaqAccordion";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Q&A | Time Taxi Khaolak",
  description:
    "Frequently asked questions about our private taxi transfer service.",
};

export default async function QAPage() {
  const categories = await db.faqCategory.findMany({
    where: { isActive: true },
    include: {
      faqs: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="min-h-screen bg-[#0a1628] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-center text-[#d4af37] font-bold text-3xl mb-2">
          Q & A
        </h1>
        <p className="text-center text-white/50 text-sm mb-10">
          Can&apos;t find your answer? Contact us via WhatsApp — we reply within
          1 minute.
        </p>
        <FaqAccordion categories={categories} />
      </div>
    </div>
  );
}
