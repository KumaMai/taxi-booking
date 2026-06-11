import BookingForm from "@/components/booking/BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Car | Time Taxi Khaolak",
  description:
    "Book your private taxi transfer. Pay after trip — no deposit required. 24/7 service.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[#d4af37] font-bold text-3xl mb-2">Book a Car</h1>
          <p className="text-white/50 text-sm">
            Fill in the details below — we will confirm within{" "}
            <span className="text-[#d4af37]">1 minute</span>
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-white/40">
            <span>✓ No deposit</span>
            <span>✓ Pay after trip</span>
            <span>✓ 24/7 service</span>
            <span>✓ English-speaking drivers</span>
          </div>
        </div>

        {/* Form */}
        <BookingForm />

        {/* Alternative contact */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm mb-3">Or book directly via</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href="https://wa.me/66986822951"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0f2040] border border-white/10 hover:border-[#d4af37]/40 text-white/70 hover:text-white text-xs px-4 py-2 rounded-full transition-colors"
            >
              💬 WhatsApp
            </a>
            <a
              href="https://line.me/ti/p/~@timetaxikhaolak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0f2040] border border-white/10 hover:border-[#d4af37]/40 text-white/70 hover:text-white text-xs px-4 py-2 rounded-full transition-colors"
            >
              📱 LINE
            </a>
            <a
              href="tel:0986822951"
              className="flex items-center gap-2 bg-[#0f2040] border border-white/10 hover:border-[#d4af37]/40 text-white/70 hover:text-white text-xs px-4 py-2 rounded-full transition-colors"
            >
              📞 Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
