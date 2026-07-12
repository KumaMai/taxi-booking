"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq, FaqCategory } from "@prisma/client";
import type { Locale } from "@/lib/locale";

type CategoryWithFaqs = FaqCategory & { faqs: Faq[] };

function AccordionItem({ faq, locale }: { faq: Faq; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const question = locale === "th" && faq.questionTh ? faq.questionTh : faq.questionEn;
  const answer = locale === "th" && faq.answerTh ? faq.answerTh : faq.answerEn;
  return <div className="border-b border-[#f3eadb]/10 last:border-0"><button onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={contentId} className="group flex w-full items-center justify-between gap-4 py-5 text-left"><span className="text-sm text-[#d9cbb8] transition-colors group-hover:text-[#f3eadb]">{question}</span><ChevronDown size={17} className={`shrink-0 text-[#e46d52] transition-transform duration-200 ${open ? "rotate-180" : ""}`} /></button>{open && <div id={contentId} className="pb-5 text-sm leading-relaxed text-[#d9cbb8]">{answer}</div>}</div>;
}

export default function FaqAccordion({ categories, locale = "en" }: { categories: CategoryWithFaqs[]; locale?: Locale }) {
  const [activeTab, setActiveTab] = useState(0);
  const active = categories[activeTab];
  return <section className="bg-[#102326] py-20 md:py-24"><div className="mx-auto max-w-4xl px-5 md:px-8"><p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#79b8a7]">{locale === "th" ? "ก่อนออกเดินทาง" : "Before you go"}</p><h2 className="mb-3 text-center text-4xl text-[#f3eadb] md:text-5xl">{locale === "th" ? "คำถามที่พบบ่อย" : "Questions, answered simply."}</h2><p className="mb-8 text-center text-sm text-[#d9cbb8]">{locale === "th" ? "ข้อมูลสำคัญก่อนใช้บริการรับส่ง" : "Everything you need to know before your transfer."}</p><div className="mb-6 flex flex-wrap justify-center gap-2">{categories.map((category, index) => <button key={category.faqCategoriesId} onClick={() => setActiveTab(index)} className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${index === activeTab ? "bg-[#e46d52] text-[#102326]" : "border border-[#f3eadb]/15 bg-[#0b2a2f] text-[#d9cbb8] hover:text-[#f3eadb]"}`}>{locale === "th" ? category.nameTh : category.nameEn}</button>)}</div>{active && <div className="rounded-[1.5rem] border border-[#f3eadb]/15 bg-[#0b2a2f] px-6">{active.faqs.map((faq) => <AccordionItem key={faq.faqsId} faq={faq} locale={locale} />)}</div>}</div></section>;
}
