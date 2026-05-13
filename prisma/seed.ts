import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed v3...");

  // ─── 1. PRICE ZONES + ROUTES (7 zones, 46 routes) ─────────
  console.log("📍 Seeding price zones...");

  await prisma.priceRoute.deleteMany();
  await prisma.priceZone.deleteMany();

  // ── Zone 1: Phuket Airport (3 routes) ──
  await prisma.priceZone.create({
    data: {
      nameEn: "Phuket Airport",
      nameTh: "สนามบินภูเก็ต",
      sortOrder: 1,
      routes: {
        create: [
          {
            fromEn: "Phuket Airport",
            fromTh: "สนามบินภูเก็ต",
            toEn: "Khao Lak",
            toTh: "เขาหลาก",
            priceStandard: 1200,
            priceSuv: 1300,
            priceVan: 1400,
            sortOrder: 1,
          },
          {
            fromEn: "Phuket Airport",
            fromTh: "สนามบินภูเก็ต",
            toEn: "Bang Sak",
            toTh: "บางสัก",
            priceStandard: 1300,
            priceSuv: 1400,
            priceVan: 1500,
            sortOrder: 2,
          },
          {
            fromEn: "Phuket Airport",
            fromTh: "สนามบินภูเก็ต",
            toEn: "Nam Khem",
            toTh: "น้ำเค็ม",
            priceStandard: 1600,
            priceSuv: 1600,
            priceVan: 1700,
            sortOrder: 3,
          },
        ],
      },
    },
  });

  // ── Zone 2: Phuket Area (19 routes) ──
  await prisma.priceZone.create({
    data: {
      nameEn: "Phuket Area",
      nameTh: "พื้นที่ภูเก็ต",
      sortOrder: 2,
      routes: {
        create: [
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Phuket Airport",
            toTh: "สนามบินภูเก็ต",
            priceStandard: 1200,
            priceSuv: 1300,
            priceVan: 1400,
            sortOrder: 1,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Naiyang",
            toTh: "ในยาง",
            priceStandard: 1200,
            priceSuv: 1300,
            priceVan: 1400,
            sortOrder: 2,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Maikhao",
            toTh: "ไม้ขาว",
            priceStandard: 1200,
            priceSuv: 1300,
            priceVan: 1400,
            sortOrder: 3,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Ao Por Marina",
            toTh: "อ่าวปอ มาริน่า",
            priceStandard: 1600,
            priceSuv: 1700,
            priceVan: 1800,
            sortOrder: 4,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Bang Rong Pier",
            toTh: "ท่าเรือบางโรง",
            priceStandard: 1600,
            priceSuv: 1700,
            priceVan: 1800,
            sortOrder: 5,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Laguna",
            toTh: "ลากูน่า",
            priceStandard: 1700,
            priceSuv: 1800,
            priceVan: 1900,
            sortOrder: 6,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Bangtao",
            toTh: "บางเทา",
            priceStandard: 1700,
            priceSuv: 1800,
            priceVan: 1900,
            sortOrder: 7,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Layan",
            toTh: "ลายัน",
            priceStandard: 1800,
            priceSuv: 1900,
            priceVan: 2000,
            sortOrder: 8,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Sirin",
            toTh: "สิรินทร์",
            priceStandard: 1800,
            priceSuv: 1900,
            priceVan: 2000,
            sortOrder: 9,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Kamala",
            toTh: "กมลา",
            priceStandard: 1800,
            priceSuv: 1900,
            priceVan: 2000,
            sortOrder: 10,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Patong",
            toTh: "ป่าตอง",
            priceStandard: 2000,
            priceSuv: 2100,
            priceVan: 2200,
            sortOrder: 11,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Kata / Karon",
            toTh: "กะตะ / กะรน",
            priceStandard: 2000,
            priceSuv: 2100,
            priceVan: 2200,
            sortOrder: 12,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Rawai",
            toTh: "ราไวย์",
            priceStandard: 2000,
            priceSuv: 2100,
            priceVan: 2400,
            sortOrder: 13,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Naithon",
            toTh: "ในทอน",
            priceStandard: 1400,
            priceSuv: 1500,
            priceVan: 1600,
            sortOrder: 14,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Phuket Town",
            toTh: "เมืองภูเก็ต",
            priceStandard: 1800,
            priceSuv: 1900,
            priceVan: 2000,
            sortOrder: 15,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Rassada Pier",
            toTh: "ท่าเรือราษฎา",
            priceStandard: 1800,
            priceSuv: 1900,
            priceVan: 2000,
            sortOrder: 16,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Koh Sirey",
            toTh: "เกาะสิเหร่",
            priceStandard: 1800,
            priceSuv: 1900,
            priceVan: 2000,
            sortOrder: 17,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Sri Panwa",
            toTh: "ศรีพันวา",
            priceStandard: 2000,
            priceSuv: 2100,
            priceVan: 2300,
            sortOrder: 18,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Phuket Shopping (8 hrs.)",
            toTh: "ช็อปปิ้งภูเก็ต (8ชม.)",
            priceStandard: 3200,
            priceSuv: 3400,
            priceVan: 3800,
            sortOrder: 19,
          },
        ],
      },
    },
  });

  // ── Zone 3: Surat-Thani Area (7 routes) ──
  await prisma.priceZone.create({
    data: {
      nameEn: "Surat-Thani Area",
      nameTh: "พื้นที่สุราษฎร์ธานี",
      sortOrder: 3,
      routes: {
        create: [
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Khao Sok",
            toTh: "เขาสก",
            priceStandard: 1200,
            priceSuv: 1300,
            priceVan: 1400,
            sortOrder: 1,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Ratchaprapha Dam",
            toTh: "เขื่อนรัชชประภา",
            priceStandard: 2200,
            priceSuv: 2300,
            priceVan: 2500,
            sortOrder: 2,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Surat Thani Airport",
            toTh: "สนามบินสุราษฎร์ธานี",
            priceStandard: 3000,
            priceSuv: 3500,
            priceVan: 3200,
            sortOrder: 3,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Phaya Tapi Pier",
            toTh: "ท่าเรือพายัพตาปี",
            priceStandard: 3400,
            priceSuv: 3500,
            priceVan: 3600,
            sortOrder: 4,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Phunphin Railway Station",
            toTh: "สถานีรถไฟพุนพิน",
            priceStandard: 3400,
            priceSuv: 3500,
            priceVan: 3600,
            sortOrder: 5,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Surat Thani Town",
            toTh: "เมืองสุราษฎร์ธานี",
            priceStandard: 3400,
            priceSuv: 3500,
            priceVan: 3600,
            sortOrder: 6,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Don Sak Pier",
            toTh: "ท่าเรือดอนสัก",
            priceStandard: 3700,
            priceSuv: 3800,
            priceVan: 3900,
            sortOrder: 7,
          },
        ],
      },
    },
  });

  // ── Zone 4: Krabi Area (4 routes) ──
  await prisma.priceZone.create({
    data: {
      nameEn: "Krabi Area",
      nameTh: "พื้นที่กระบี่",
      sortOrder: 4,
      routes: {
        create: [
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Ao Nang",
            toTh: "อ่าวนาง",
            priceStandard: 2500,
            priceSuv: 2600,
            priceVan: 2700,
            sortOrder: 1,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Krabi Town",
            toTh: "เมืองกระบี่",
            priceStandard: 2500,
            priceSuv: 2600,
            priceVan: 2700,
            sortOrder: 2,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Krabi Airport",
            toTh: "สนามบินกระบี่",
            priceStandard: 2500,
            priceSuv: 2600,
            priceVan: 2700,
            sortOrder: 3,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Koh Lanta (To Hotel)",
            toTh: "เกาะลันตา (ถึงโรงแรม)",
            priceStandard: 4300,
            priceSuv: 4500,
            priceVan: 4800,
            sortOrder: 4,
          },
        ],
      },
    },
  });

  // ── Zone 5: Phang-Nga Area (5 routes) ── แก้ไข v3: เพิ่ม Khao Sok
  await prisma.priceZone.create({
    data: {
      nameEn: "Phang-Nga Area",
      nameTh: "พื้นที่พังงา",
      sortOrder: 5,
      routes: {
        create: [
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Taplamu",
            toTh: "ท้ายเหมือง",
            priceStandard: 400,
            priceSuv: 600,
            priceVan: 700,
            sortOrder: 1,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Namkem",
            toTh: "น้ำเค็ม",
            priceStandard: 600,
            priceSuv: 600,
            priceVan: 700,
            sortOrder: 2,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Khok Kloy",
            toTh: "โคกกลอย",
            priceStandard: 800,
            priceSuv: 900,
            priceVan: 1000,
            sortOrder: 3,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Khao Sok",
            toTh: "เขาสก",
            priceStandard: 1200,
            priceSuv: 1300,
            priceVan: 1400,
            sortOrder: 4,
          }, // ← เพิ่มใหม่ v3
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Phang-nga Town",
            toTh: "เมืองพังงา",
            priceStandard: 1200,
            priceSuv: 1300,
            priceVan: 1400,
            sortOrder: 5,
          },
        ],
      },
    },
  });

  // ── Zone 6: Ranong Area (3 routes) ── แก้ไข v3: แยกออกจาก Additional
  await prisma.priceZone.create({
    data: {
      nameEn: "Ranong Area",
      nameTh: "พื้นที่ระนอง",
      sortOrder: 6,
      routes: {
        create: [
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Kuraburi Port",
            toTh: "ท่าเรือคุระบุรี",
            priceStandard: 1600,
            priceSuv: 1700,
            priceVan: 1800,
            sortOrder: 1,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Ranong Airport",
            toTh: "สนามบินระนอง",
            priceStandard: 3200,
            priceSuv: 3400,
            priceVan: 3600,
            sortOrder: 2,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Port In Ranong",
            toTh: "ท่าเรือระนอง",
            priceStandard: 3200,
            priceSuv: 3300,
            priceVan: 3600,
            sortOrder: 3,
          },
        ],
      },
    },
  });

  // ── Zone 7: Additional Routes (5 routes) ── แก้ไข v3: Zone ใหม่แยกจาก Ranong
  await prisma.priceZone.create({
    data: {
      nameEn: "Additional Routes",
      nameTh: "เส้นทางเพิ่มเติม",
      sortOrder: 7,
      routes: {
        create: [
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Chumphon Port",
            toTh: "ท่าเรือชุมพร",
            priceStandard: 5400,
            priceSuv: 5300,
            priceVan: 5600,
            sortOrder: 1,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Hua Hin",
            toTh: "หัวหิน",
            priceStandard: 8200,
            priceSuv: 8400,
            priceVan: 8600,
            sortOrder: 2,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Cha-am",
            toTh: "ชะอำ",
            priceStandard: 9000,
            priceSuv: 9500,
            priceVan: 9800,
            sortOrder: 3,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Bangkok",
            toTh: "กรุงเทพมหานคร",
            priceStandard: 12000,
            priceSuv: 13000,
            priceVan: 14000,
            sortOrder: 4,
          },
          {
            fromEn: "Khao Lak",
            fromTh: "เขาหลาก",
            toEn: "Suvarnabhumi Airport",
            toTh: "สนามบินสุวรรณภูมิ",
            priceStandard: 14000,
            priceSuv: 15000,
            priceVan: 16000,
            sortOrder: 5,
          },
        ],
      },
    },
  });

  console.log("✅ Created 7 price zones + 46 routes");

  // ─── 2. REVIEWS ───────────────────────────────────────────
  console.log("⭐ Seeding reviews...");

  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: [
      {
        reviewerName: "Sarah M.",
        reviewText:
          "Excellent service and very friendly driver! The van was clean and comfortable. Will definitely use again on our next trip.",
        rating: 5,
        source: "TRIPADVISOR",
      },
      {
        reviewerName: "James K.",
        reviewText:
          "Clean car, on-time pick-up, and safe trip. Driver spoke good English and gave great local tips along the way.",
        rating: 5,
        source: "GOOGLE",
      },
      {
        reviewerName: "Marie D.",
        reviewText:
          "Best private van service in Khao Lak — highly recommended! Booked via WhatsApp, confirmed within minutes. No deposit needed.",
        rating: 5,
        source: "TRIPADVISOR",
      },
      {
        reviewerName: "วิภาพร มาลา",
        reviewText:
          "บริการดีมาก คนขับสุภาพและตรงเวลา รถสะอาดมาก ราคาไม่แพง แนะนำมากเลยค่ะ",
        rating: 5,
        source: "DIRECT",
      },
      {
        reviewerName: "Tom & Lisa",
        reviewText:
          "Used Time Taxi for airport transfer with 2 kids and lots of luggage. The Van was perfect, driver very patient and helpful.",
        rating: 5,
        source: "GOOGLE",
      },
      {
        reviewerName: "Akira T.",
        reviewText:
          "Punctual, professional, and very clean vehicle. Easy booking through LINE. Will use again for our next Phuket trip.",
        rating: 5,
        source: "DIRECT",
      },
    ],
  });
  console.log("✅ Created 6 reviews");

  // ─── 3. FAQ CATEGORIES + FAQS ─────────────────────────────
  console.log("❓ Seeding FAQ categories + FAQs...");

  await prisma.faq.deleteMany();
  await prisma.faqCategory.deleteMany();

  const catBooking = await prisma.faqCategory.create({
    data: { nameEn: "Car Booking", nameTh: "การจองรถ", sortOrder: 1 },
  });
  const catPayment = await prisma.faqCategory.create({
    data: {
      nameEn: "Pricing and Payment",
      nameTh: "ราคาและการชำระเงิน",
      sortOrder: 2,
    },
  });
  const catTravel = await prisma.faqCategory.create({
    data: {
      nameEn: "Travel and Services",
      nameTh: "การเดินทางและบริการ",
      sortOrder: 3,
    },
  });
  const catSafety = await prisma.faqCategory.create({
    data: {
      nameEn: "Safety and Convenience",
      nameTh: "ความปลอดภัยและความสะดวก",
      sortOrder: 4,
    },
  });

  await prisma.faq.createMany({
    data: [
      {
        categoryId: catBooking.faqCategoriesId,
        sortOrder: 1,
        questionEn: "How do I book a car?",
        questionTh: "จองรถได้อย่างไร?",
        answerEn:
          "You can book via our website form, WhatsApp, LINE, WeChat, or Facebook. We confirm within 1 minute.",
        answerTh:
          "จองได้ผ่านฟอร์มบนเว็บไซต์, WhatsApp, LINE, WeChat หรือ Facebook เราจะยืนยันภายใน 1 นาที",
      },
      {
        categoryId: catBooking.faqCategoriesId,
        sortOrder: 2,
        questionEn: "How far in advance should I book?",
        questionTh: "ควรจองล่วงหน้านานแค่ไหน?",
        answerEn:
          "We recommend booking at least 24 hours in advance, but same-day bookings are also accepted subject to availability.",
        answerTh:
          "แนะนำจองล่วงหน้าอย่างน้อย 24 ชั่วโมง แต่รับจองในวันเดียวกันได้เช่นกัน ขึ้นอยู่กับความพร้อมของรถ",
      },
      {
        categoryId: catPayment.faqCategoriesId,
        sortOrder: 1,
        questionEn: "Do I need to pay a deposit?",
        questionTh: "ต้องจ่ายมัดจำไหม?",
        answerEn:
          "No deposit required! You pay after your trip is complete. We operate on a trust-based system.",
        answerTh:
          "ไม่ต้องวางมัดจำ! ชำระเงินหลังเดินทางเสร็จ เราให้บริการบนความไว้วางใจ",
      },
      {
        categoryId: catPayment.faqCategoriesId,
        sortOrder: 2,
        questionEn: "What payment methods are accepted?",
        questionTh: "รับชำระเงินแบบไหนบ้าง?",
        answerEn:
          "We accept cash (THB), bank transfer, and major credit cards. Payment is made at the end of your trip.",
        answerTh:
          "รับเงินสด (บาทไทย), โอนเงินธนาคาร และบัตรเครดิตหลักๆ ชำระเมื่อสิ้นสุดการเดินทาง",
      },
      {
        categoryId: catTravel.faqCategoriesId,
        sortOrder: 1,
        questionEn: "What vehicle types are available?",
        questionTh: "มีรถประเภทไหนบ้าง?",
        answerEn:
          "Sedan (1-2 pax), SUV (1-4 pax), and Van (1-9 pax). All vehicles are clean, well-maintained, and fully insured.",
        answerTh:
          "Sedan (1-2 คน), SUV (1-4 คน) และ Van (1-9 คน) รถทุกคันสะอาด บำรุงรักษาดี และมีประกันครบ",
      },
      {
        categoryId: catTravel.faqCategoriesId,
        sortOrder: 2,
        questionEn: "Do you provide child seats?",
        questionTh: "มีที่นั่งเด็กให้ไหม?",
        answerEn:
          "Yes! Child seats are available on request. Please mention it in the notes field when booking.",
        answerTh: "มีให้บริการ! กรุณาระบุในช่องหมายเหตุตอนจองได้เลย",
      },
      {
        categoryId: catSafety.faqCategoriesId,
        sortOrder: 1,
        questionEn: "Are your drivers English-speaking?",
        questionTh: "คนขับพูดภาษาอังกฤษได้ไหม?",
        answerEn:
          "Yes, all our drivers are professional and English-speaking, ensuring clear communication throughout your journey.",
        answerTh:
          "ได้ คนขับทุกคันมืออาชีพและพูดภาษาอังกฤษได้ เพื่อการสื่อสารที่ชัดเจนตลอดการเดินทาง",
      },
      {
        categoryId: catSafety.faqCategoriesId,
        sortOrder: 2,
        questionEn: "Do you offer 24/7 service?",
        questionTh: "ให้บริการตลอด 24 ชั่วโมงไหม?",
        answerEn:
          "Yes! We are available 24 hours a day, 7 days a week. No matter when your flight lands, we will be there.",
        answerTh:
          "ใช่! เราให้บริการตลอด 24 ชั่วโมงทุกวัน ไม่ว่าเที่ยวบินจะลงกี่โมง เราพร้อมเสมอ",
      },
    ],
  });
  console.log("✅ Created 4 FAQ categories + 8 FAQs");

  // ─── 4. ATTRACTIONS ───────────────────────────────────────
  console.log("🏝️ Seeding attractions...");

  await prisma.attraction.deleteMany();
  await prisma.attraction.createMany({
    data: [
      {
        nameEn: "Cheow Lan Dam",
        nameTh: "เขื่อนเชี่ยวหลาน",
        descriptionEn:
          "Stunning emerald lake surrounded by limestone mountains in Khao Sok National Park.",
        descriptionTh:
          "ทะเลสาบสีมรกตที่สวยงามล้อมรอบด้วยภูเขาหินปูนในอุทยานแห่งชาติเขาสก",
        sortOrder: 1,
      },
      {
        nameEn: "Khao Sok National Park",
        nameTh: "อุทยานแห่งชาติเขาสก",
        descriptionEn:
          "One of the oldest rainforests in the world with diverse wildlife and jungle trekking.",
        descriptionTh:
          "หนึ่งในป่าฝนที่เก่าแก่ที่สุดในโลก มีสัตว์ป่าหลากหลายและเส้นทางเดินป่า",
        sortOrder: 2,
      },
      {
        nameEn: "Similan Islands",
        nameTh: "หมู่เกาะสิมิลัน",
        descriptionEn:
          "World-renowned diving destination with crystal clear waters and vibrant coral reefs.",
        descriptionTh: "แหล่งดำน้ำระดับโลก น้ำทะเลใสและแนวปะการังที่สวยงาม",
        sortOrder: 3,
      },
      {
        nameEn: "Surin Islands",
        nameTh: "หมู่เกาะสุรินทร์",
        descriptionEn:
          "Marine national park famous for whale shark encounters and pristine snorkeling.",
        descriptionTh:
          "อุทยานแห่งชาติทางทะเล มีชื่อเสียงเรื่องการพบฉลามวาฬและดำน้ำตื้น",
        sortOrder: 4,
      },
      {
        nameEn: "Tiger Park",
        nameTh: "สวนเสือ",
        descriptionEn:
          "Get up close with magnificent tigers and other exotic animals in a safe environment.",
        descriptionTh: "ใกล้ชิดกับเสือและสัตว์แปลกๆ ในสภาพแวดล้อมที่ปลอดภัย",
        sortOrder: 5,
      },
      {
        nameEn: "Phuket Old Town",
        nameTh: "เมืองเก่าภูเก็ต",
        descriptionEn:
          "Charming Sino-Portuguese architecture, vibrant street art, and excellent local food.",
        descriptionTh:
          "สถาปัตยกรรมชิโน-โปรตุกีสที่น่าหลงใหล ศิลปะข้างถนน และอาหารท้องถิ่น",
        sortOrder: 6,
      },
    ],
  });
  console.log("✅ Created 6 attractions");

  // ─── 5. ADMIN USER ────────────────────────────────────────
  console.log("👤 Seeding admin user...");

  await prisma.adminUser.deleteMany();
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12,
  );
  await prisma.adminUser.create({
    data: {
      email: process.env.ADMIN_EMAIL || "admin@timetaxikhaolak.com",
      passwordHash,
      name: "Admin",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Created admin user (SUPER_ADMIN)");

  // ─── 6. SETTINGS ──────────────────────────────────────────
  console.log("⚙️ Seeding settings...");

  await prisma.setting.deleteMany();
  await prisma.setting.createMany({
    data: [
      {
        key: "whatsapp_number",
        value: "+66986822951",
        description: "WhatsApp contact number — ใช้กับปุ่ม WhatsApp",
      },
      {
        key: "line_id",
        value: "@timetaxikhaolak",
        description: "LINE Official Account ID",
      },
      { key: "phone", value: "0986822951", description: "เบอร์โทรศัพท์หลัก" },
      {
        key: "email",
        value: "timetaxikhaolak@gmail.com",
        description: "อีเมลรับการจองและติดต่อ",
      },
      {
        key: "facebook_page",
        value: "Time Taxi Khao Lak",
        description: "Facebook Page name",
      },
      {
        key: "location",
        value: "Khao Lak, Phang Nga, Thailand",
        description: "ที่ตั้งบริษัท",
      },
      {
        key: "tripadvisor_url",
        value: "https://www.tripadvisor.com",
        description: "ลิงก์หน้า TripAdvisor",
      },
    ],
  });
  console.log("✅ Created 7 settings");

  // ─── Summary ──────────────────────────────────────────────
  console.log("\n🎉 Seed v3 completed successfully!");
  console.log("📊 Summary:");
  console.log("   • 7 price zones + 46 routes");
  console.log("     Zone 1: Phuket Airport   —  3 routes");
  console.log("     Zone 2: Phuket Area      — 19 routes");
  console.log("     Zone 3: Surat-Thani      —  7 routes");
  console.log("     Zone 4: Krabi Area       —  4 routes");
  console.log("     Zone 5: Phang-Nga Area   —  5 routes (+ Khao Sok)");
  console.log("     Zone 6: Ranong Area      —  3 routes");
  console.log("     Zone 7: Additional       —  5 routes");
  console.log("   • 6 reviews");
  console.log("   • 4 FAQ categories + 8 FAQs");
  console.log("   • 6 attractions");
  console.log("   • 1 admin user (SUPER_ADMIN)");
  console.log("   • 7 settings");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
