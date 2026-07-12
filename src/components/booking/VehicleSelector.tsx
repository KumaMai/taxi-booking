"use client";
import type { VehicleType } from "@/types";
import type { Locale } from "@/lib/locale";

const VEHICLES = [
  { type: "SEDAN" as VehicleType, emoji: "🚗", en: "Sedan", th: "ซีดาน", seats: "1-2", bags: "2", price: "1,200" },
  { type: "SUV" as VehicleType, emoji: "🚙", en: "SUV", th: "SUV", seats: "1-4", bags: "4", price: "1,300" },
  { type: "VAN" as VehicleType, emoji: "🚐", en: "Van", th: "รถตู้", seats: "1-9", bags: "8+", price: "1,400" },
];

export default function VehicleSelector({ value, onChange, error, locale = "en" }: { value: VehicleType; onChange: (value: VehicleType) => void; error?: string; locale?: Locale }) {
  const thai = locale === "th";
  return <div><div role="radiogroup" aria-label={thai ? "ประเภทรถ" : "Vehicle type"} className="grid grid-cols-1 gap-3 sm:grid-cols-3">{VEHICLES.map((vehicle) => <button key={vehicle.type} type="button" role="radio" aria-checked={value === vehicle.type} aria-label={`${thai ? vehicle.th : vehicle.en}, ${vehicle.seats} ${thai ? "คน" : "passengers"}`} onClick={() => onChange(vehicle.type)} className={`relative flex flex-col items-center rounded-xl border-2 p-4 text-center transition-all ${value === vehicle.type ? "scale-[1.02] border-[#e46d52] bg-[#e46d52]/10" : "border-[#102326]/15 bg-[#f3eadb] hover:border-[#e46d52]/60"}`}>{vehicle.type === "SUV" && <span className="absolute -top-2.5 rounded-full bg-[#e46d52] px-2 py-0.5 text-[9px] font-bold text-[#102326]">{thai ? "ยอดนิยม" : "POPULAR"}</span>}<span className="mb-2 text-3xl">{vehicle.emoji}</span><span className="mb-1 text-sm font-bold text-[#102326]">{thai ? vehicle.th : vehicle.en}</span><span className="text-xs text-[#102326]/60">👤 {vehicle.seats} {thai ? "คน" : "pax"}</span><span className="text-xs text-[#102326]/60">🧳 {vehicle.bags} {thai ? "ใบ" : "bags"}</span><span className="mt-2 text-xs font-medium text-[#e46d52]">{thai ? "เริ่มต้น" : "from"} {vehicle.price} THB</span></button>)}</div>{error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}</div>;
}
