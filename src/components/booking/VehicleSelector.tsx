"use client";

import type { VehicleType } from "@/types";

interface Vehicle {
  type: VehicleType;
  emoji: string;
  label: string;
  seats: string;
  luggage: string;
  desc: string;
  price: string;
}

const VEHICLES: Vehicle[] = [
  {
    type: "SEDAN",
    emoji: "🚗",
    label: "Sedan",
    seats: "1-2",
    luggage: "2 bags",
    desc: "Comfortable for couples or solo travelers",
    price: "from 1,200 THB",
  },
  {
    type: "SUV",
    emoji: "🚙",
    label: "SUV",
    seats: "1-4",
    luggage: "4 bags",
    desc: "Spacious for families or small groups",
    price: "from 1,300 THB",
  },
  {
    type: "VAN",
    emoji: "🚐",
    label: "Van",
    seats: "1-9",
    luggage: "8+ bags",
    desc: "Perfect for large groups with lots of luggage",
    price: "from 1,400 THB",
  },
];

interface Props {
  value: VehicleType;
  onChange: (value: VehicleType) => void;
  error?: string;
}

export default function VehicleSelector({ value, onChange, error }: Props) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {VEHICLES.map((v) => (
          <button
            key={v.type}
            type="button"
            onClick={() => onChange(v.type)}
            className={`relative flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all ${
              value === v.type
                ? "border-[#d4af37] bg-[#d4af37]/10 scale-[1.02]"
                : "border-white/10 bg-[#0a1628] hover:border-white/30"
            }`}
          >
            {v.type === "SUV" && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0a1628] text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                POPULAR
              </span>
            )}
            <span className="text-3xl mb-2">{v.emoji}</span>
            <span
              className={`font-bold text-sm mb-1 ${value === v.type ? "text-[#d4af37]" : "text-white"}`}
            >
              {v.label}
            </span>
            <span className="text-white/50 text-xs">👤 {v.seats} pax</span>
            <span className="text-white/50 text-xs">🧳 {v.luggage}</span>
            <span
              className={`text-xs mt-2 font-medium ${value === v.type ? "text-[#d4af37]" : "text-white/40"}`}
            >
              {v.price}
            </span>
          </button>
        ))}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
