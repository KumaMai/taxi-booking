"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq, FaqCategory } from "@prisma/client";

type CategoryWithFaqs = FaqCategory & { faqs: Faq[] };

interface Props {
  categories: CategoryWithFaqs[];
}

function AccordionItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-white/80 group-hover:text-white text-sm transition-colors">
          {faq.questionEn}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#d4af37] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-white/55 text-sm leading-relaxed">
          {faq.answerEn}
        </div>
      )}
    </div>
  );
}

export default function FaqAccordion({ categories }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const active = categories[activeTab];

  return (
    <section className="bg-[#0f2040] py-14">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-center text-[#d4af37] font-bold text-2xl md:text-3xl mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-white/50 text-sm mb-8">
          Everything you need to know about our service
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat, i) => (
            <button
              key={cat.faqCategoriesId}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                i === activeTab
                  ? "bg-[#d4af37] text-[#0a1628] font-medium"
                  : "bg-[#0a1628] text-white/60 hover:text-white border border-white/10"
              }`}
            >
              {cat.nameEn}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        {active && (
          <div className="bg-[#0a1628] rounded-2xl border border-white/10 px-6">
            {active.faqs.map((faq) => (
              <AccordionItem key={faq.faqsId} faq={faq} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
