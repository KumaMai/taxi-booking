# Time Taxi Khaolak — Private Transfer Booking System

Clone of [timetaxikhaolak.com](https://timetaxikhaolak.com) — ระบบจองรถรับส่งส่วนตัว
ระหว่างสนามบินภูเก็ตและเขาหลาก

## 🚗 Features

- หน้า Landing Page พร้อม Hero, Vehicle Types, Reviews, FAQ
- ตารางราคา 7 โซน 46 เส้นทาง (ดึงจาก Database)
- ระบบจองออนไลน์ (Phase 4)
- Admin Panel จัดการการจอง (Phase 5)
- รองรับ 2 ภาษา TH/EN (Phase 6)
- Pay after trip — ไม่ต้องวางมัดจำ

## 🛠 Tech Stack

| Layer           | Technology               |
| --------------- | ------------------------ |
| Framework       | Next.js 16 (App Router)  |
| Language        | TypeScript 5             |
| Styling         | Tailwind CSS v4          |
| UI Components   | shadcn/ui (Radix + Nova) |
| ORM             | Prisma 7                 |
| Database        | PostgreSQL 16            |
| Auth            | NextAuth.js v5           |
| Forms           | react-hook-form + zod    |
| Email           | Nodemailer               |
| Package Manager | pnpm                     |

## 📁 Project Structure

taxi-booking/
── DOCS (ใหม่) ────────────────────────────
├── docs/
│ ├── AI_Generated_Doc/ ← ไฟล์ที่ AI สร้างให้
│ │
│ └── Web_References/ ← ไฟล์ต้นแบบเว็บ timetaxikhaolak.com
│
── PRISMA ─────────────────────────────────
├── prisma/
│ ├── schema.prisma ← 9 models + 7 enums (v3)
│ ├── seed.ts ← 7 zones + 46 routes + reviews + FAQs
│ └── migrations/ ← auto-generated
├── prisma.config.ts ← Prisma 7 config (DATABASE_URL + seed)
│
── SOURCE ─────────────────────────────────
├── src/
│ ├── app/
│ │ ├── (public)/ ← Route Group: shared Navbar+Footer
│ │ │ ├── layout.tsx ← Navbar + Footer + WhatsAppButton
│ │ │ ├── page.tsx ← / Home (SSR)
│ │ │ ├── about/page.tsx ← /about (SSG)
│ │ │ ├── booking/page.tsx ← /booking (Phase 4)
│ │ │ ├── contact/page.tsx ← /contact (Static)
│ │ │ ├── price-list/page.tsx ← /price-list (SSG)
│ │ │ ├── qa/page.tsx ← /qa (SSG)
│ │ │ ├── reviews/page.tsx ← /reviews (SSR)
│ │ │ └── travel/page.tsx ← /travel (SSG)
│ │ │
│ │ ├── admin/ ← Admin Panel (Phase 5)
│ │ │ ├── layout.tsx ← Protected layout (auth check)
│ │ │ ├── page.tsx ← /admin Dashboard
│ │ │ ├── bookings/page.tsx ← จัดการการจอง
│ │ │ ├── faq/page.tsx ← จัดการ FAQ
│ │ │ ├── login/page.tsx ← Admin login
│ │ │ ├── prices/page.tsx ← จัดการราคา
│ │ │ └── reviews/page.tsx ← จัดการรีวิว
│ │ │
│ │ ├── api/
│ │ │ ├── auth/[...nextauth]/route.ts ← NextAuth endpoints
│ │ │ └── booking/route.ts ← POST /api/booking (Phase 4)
│ │ │
│ │ ├── favicon.ico
│ │ ├── globals.css ← Tailwind v4 + dark navy theme
│ │ └── layout.tsx ← Root: <html><body> + fonts
│ │
│ ├── components/
│ │ ├── booking/ ← Phase 4
│ │ │ ├── BookingForm.tsx
│ │ │ └── VehicleSelector.tsx
│ │ ├── home/
│ │ │ ├── FaqAccordion.tsx ← 'use client' accordion
│ │ │ ├── HeroSection.tsx
│ │ │ ├── ReviewsSection.tsx
│ │ │ └── VehicleCards.tsx
│ │ ├── layout/
│ │ │ ├── Footer.tsx
│ │ │ └── Navbar.tsx ← 'use client' mobile menu
│ │ ├── price/
│ │ │ └── PriceZoneTable.tsx
│ │ └── ui/
│ │ ├── button.tsx ← shadcn/ui
│ │ └── WhatsAppButton.tsx
│ │
│ ├── lib/
│ │ ├── auth.ts ← NextAuth config (Phase 5)
│ │ ├── db.ts ← Prisma 7 adapter singleton
│ │ ├── email.ts ← Nodemailer (Phase 4)
│ │ └── utils.ts ← cn() helper
│ │
│ ├── types/
│ │ └── index.ts ← VehicleType, BookingStatus ฯลฯ
│ └── validations/
│ └── booking.ts ← Zod schema (22 fields)
│
── CONFIG ─────────────────────────────────
├── .env.example ← Template env vars (commit ✓)
├── .env.local ← Actual secrets (gitignore ✓)
├── .gitignore
├── components.json ← shadcn/ui config
├── docker-compose.dev.yml ← PostgreSQL + pgAdmin local
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml ← allowBuilds config (pnpm 11)
├── postcss.config.mjs
├── README.md
└── tsconfig.json

## 🗄️ Database Schema

9 Tables | 7 Enums | PostgreSQL 16 + Prisma 7

| Table          | Rows (seed) | หน้าที่           |
| -------------- | ----------- | ----------------- |
| bookings       | —           | การจองทั้งหมด     |
| price_zones    | 7           | โซนพื้นที่        |
| price_routes   | 46          | ราคาแต่ละเส้นทาง  |
| reviews        | 6           | รีวิวลูกค้า       |
| faq_categories | 4           | หมวด Q&A          |
| faqs           | 8           | คำถาม-คำตอบ       |
| attractions    | 6           | สถานที่ท่องเที่ยว |
| admin_users    | 1           | ผู้ดูแลระบบ       |
| settings       | 7           | ค่า config        |

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm 11+
- Docker Desktop

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/taxi-booking.git
cd taxi-booking

# Install dependencies
pnpm install

# Start local database
docker compose -f docker-compose.dev.yml up -d

# Setup environment variables
cp .env.example .env.local
# แก้ไข .env.local ให้ถูกต้อง

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed data
npx prisma db seed

# Start development server
pnpm dev
```

เปิด [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
DATABASE_URL="postgresql://taxi_user:password@localhost:5432/taxi_booking"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_TO="timetaxikhaolak@gmail.com"
ADMIN_EMAIL="admin@timetaxikhaolak.com"
ADMIN_PASSWORD="your-admin-password"
```

## 📄 Pages

| URL           | Type      | Status     |
| ------------- | --------- | ---------- |
| `/`           | SSR       | ✅ Done    |
| `/price-list` | SSG       | ✅ Done    |
| `/about`      | SSG       | ✅ Done    |
| `/qa`         | SSG       | ✅ Done    |
| `/reviews`    | SSR       | ✅ Done    |
| `/travel`     | SSG       | ✅ Done    |
| `/contact`    | Static    | ✅ Done    |
| `/booking`    | Client    | ⏳ Phase 4 |
| `/admin/*`    | Protected | ⏳ Phase 5 |

## 📋 Development Roadmap

- [x] Phase 0 — Setup + TypeScript/React Basics
- [x] Phase 1 — Next.js Project + Docker + Tailwind + Prisma
- [x] Phase 2 — Database Schema (9 Tables) + Seed Data
- [x] Phase 3 — Public Pages (7 pages)
- [ ] Phase 4 — Booking Form + API + Email Notification
- [ ] Phase 5 — Admin Panel (Dashboard + CRUD)
- [ ] Phase 6 — i18n TH/EN + SEO Optimization
- [ ] Phase 7 — Production Deploy (VPS + GitHub Actions + SSL)

## 🐳 Docker (Local Development)

```bash
# Start PostgreSQL + pgAdmin
docker compose -f docker-compose.dev.yml up -d

# pgAdmin: http://localhost:8080
# Email: admin@taxi.dev | Password: admin123
```

## 📦 Deployment (Phase 7)

Target: DigitalOcean Singapore — Docker Compose + Nginx + Let's Encrypt

- **Cost:** ~$12/month (fixed)
- **CI/CD:** GitHub Actions → auto deploy on push to `main`
- **SSL:** Let's Encrypt (auto-renew)

## 📝 License

MIT
