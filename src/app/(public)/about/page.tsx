import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata(await getLocale(), "/about", { titleEn: "About Us | Time Taxi Khaolak", titleTh: "เกี่ยวกับเรา | Time Taxi Khaolak", descriptionEn: "Meet the local team behind reliable private transfers in Khao Lak and Phuket.", descriptionTh: "รู้จักทีมงานท้องถิ่นผู้ให้บริการรถรับส่งส่วนตัวที่น่าเชื่อถือในเขาหลักและภูเก็ต" });
}

const SERVICES = [
  [
    "🚗",
    "Private Van with Driver",
    "รถตู้ส่วนตัวพร้อมคนขับ",
    "For sightseeing, transfers, and custom tours around Khao Lak, Phuket & nearby areas.",
    "สำหรับเที่ยวชมสถานที่ รับส่ง และทัวร์รอบเขาหลัก ภูเก็ต และพื้นที่ใกล้เคียง",
  ],
  [
    "✈️",
    "Airport Transfers",
    "รับส่งสนามบิน",
    "Pick-up and drop-off service to/from Phuket International Airport.",
    "บริการรับส่งไปและกลับสนามบินนานาชาติภูเก็ต",
  ],
  [
    "☀️",
    "Private Day Trips & Tours",
    "ทริปส่วนตัวและทัวร์แบบไปเช้าเย็นกลับ",
    "Explore highlights like Samet Nangshe, Similan Islands, and Surin Islands.",
    "เที่ยวชมจุดเด่นอย่างเสม็ดนางชี หมู่เกาะสิมิลัน และหมู่เกาะสุรินทร์",
  ],
  [
    "🕐",
    "Advance & Long-Term Booking",
    "จองล่วงหน้าและระยะยาว",
    "Available for daily, weekly, or multi-day travel plans.",
    "รองรับแผนเดินทางรายวัน รายสัปดาห์ หรือหลายวัน",
  ],
] as const;
const WHY = [
  [
    "Friendly, professional, English-speaking drivers",
    "คนขับเป็นมิตร มืออาชีพ และสื่อสารภาษาอังกฤษได้",
  ],
  [
    "Clean, spacious, and fully insured vehicles",
    "รถสะอาด กว้างขวาง และมีประกันครบถ้วน",
  ],
  ["Transparent pricing — no hidden fees", "ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง"],
  ["24/7 service availability", "พร้อมให้บริการตลอด 24 ชั่วโมง"],
  [
    "Easy booking via Website, LINE, WhatsApp, or Facebook",
    "จองง่ายผ่านเว็บไซต์ LINE WhatsApp หรือ Facebook",
  ],
  [
    "Reliable, safe, and customer-focused team",
    "ทีมงานไว้ใจได้ ปลอดภัย และใส่ใจลูกค้า",
  ],
] as const;

export default async function AboutPage() {
  const [settings, locale] = await Promise.all([getSettings(), getLocale()]);
  const thai = locale === "th";
  return (
    <div className="min-h-screen bg-[#f3eadb] py-16 text-[#102326] md:py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl">
            — {thai ? "เกี่ยวกับเรา" : "About Us"} —
          </h1>
          <div className="rounded-2xl bg-[#0f2040] p-8 text-left">
            <h2 className="mb-3 text-lg font-semibold text-[#d4af37]">
              🚗 Time Taxi Khaolak —{" "}
              {thai
                ? "บริการคนขับส่วนตัวในสวรรค์ของคุณ"
                : "Your Private Driver Service in Paradise"}
            </h2>
            <p className="mb-4 font-medium text-[#f3eadb]">
              {thai
                ? "ยินดีต้อนรับสู่ Time Taxi Khaolak บริการรถตู้ส่วนตัวพร้อมคนขับที่ไว้วางใจได้ในเขาหลัก ภูเก็ต และพังงา"
                : "Welcome to Time Taxi Khaolak — a trusted private van rental with driver service based in Khao Lak, Phuket, and Phang Nga."}
            </p>
            <p className="text-sm leading-relaxed text-[#d9cbb8]">
              {thai
                ? "เรามุ่งมั่นให้บริการเดินทางที่ปลอดภัย สะดวกสบาย และเชื่อถือได้ รถทุกคันสะอาด ดูแลอย่างดี และมีประกันครบถ้วน พร้อมคนขับมืออาชีพที่ดูแลทุกการเดินทางให้ราบรื่นและตรงเวลา"
                : "We provide safe, comfortable, and reliable transportation for every travel need. Our professional drivers ensure every trip is smooth, enjoyable, and on time."}
            </p>
          </div>
        </div>
        <h2 className="mb-6 text-center text-4xl">
          🌴 {thai ? "บริการของเรา" : "Our Services"}
        </h2>
        <div className="mb-12 grid gap-4 md:grid-cols-2">
          {SERVICES.map(([icon, en, th, descEn, descTh]) => (
            <div key={en} className="rounded-xl bg-[#0f2040] p-5">
              <div className="mb-2 text-2xl">{icon}</div>
              <h3 className="mb-2 text-sm font-semibold text-[#f3eadb]">
                {thai ? th : en}
              </h3>
              <p className="text-xs leading-relaxed text-[#d9cbb8]">
                {thai ? descTh : descEn}
              </p>
            </div>
          ))}
        </div>
        <div className="mb-10 rounded-2xl bg-[#0f2040] p-8">
          <h2 className="mb-5 text-center text-xl font-bold text-[#d4af37]">
            💎 {thai ? "ทำไมต้องเลือกเรา" : "Why Choose Us"}
          </h2>
          <div className="space-y-2">
            {WHY.map(([en, th]) => (
              <p key={en} className="text-sm text-[#d9cbb8]">
                ✓ {thai ? th : en}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#0f2040] p-8 text-center">
          <h2 className="mb-5 text-xl font-bold text-[#d4af37]">
            📬 {thai ? "ติดต่อเรา" : "Contact Us"}
          </h2>
          <div className="space-y-2 text-sm text-[#d9cbb8]">
            <p>
              📞 {thai ? "โทร" : "Phone"}: {settings.phone}
            </p>
            <p>💬 LINE: {settings.lineId}</p>
            <p>📱 WhatsApp: {settings.whatsapp}</p>
            <p>✉️ Email: {settings.email}</p>
            <p>
              📍 {thai ? "ที่ตั้ง" : "Location"}: {settings.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
