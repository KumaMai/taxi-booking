# AGENTS.md — Time Taxi Khaolak Booking System

> **อ่านไฟล์นี้ก่อนทำงานทุกครั้ง** — ให้ context ครบถ้วนสำหรับ AI agent

---

## 🎯 Project Overview

**ชื่อโปรเจกต์:** taxi-booking  
**เป้าหมาย:** Clone ระบบเว็บไซต์จองแท็กซี่ส่วนตัว [timetaxikhaolak.com](https://timetaxikhaolak.com)  
**ธุรกิจ:** รับส่งส่วนตัว (Private Transfer) ระหว่างสนามบินภูเก็ต ↔ เขาหลาก  
**จุดเด่น:** Pay After Trip — No Deposit Required | 24/7 Service | English-speaking drivers

**สถานะปัจจุบัน:** Phase 3 Complete ✅ — Phase 4 (Booking Form) คือสิ่งที่ต้องทำต่อ

---

## 📍 Phase Progress

| Phase | เนื้อหา | สถานะ |
|-------|---------|-------|
| Phase 0 | Setup + TypeScript/React Basics | ✅ Done |
| Phase 1 | Next.js 16 + Docker + Tailwind v4 + Prisma 7 | ✅ Done |
| Phase 2 | Database Schema (9 tables) + Seed Data | ✅ Done |
| Phase 3 | Public Pages (7 หน้า + Layout) | ✅ Done |
| **Phase 4** | **Booking Form + API + Email Notification** | **⏳ Next** |
| Phase 5 | Admin Panel — Dashboard + CRUD | ⏳ |
| Phase 6 | i18n TH/EN + SEO Optimization | ⏳ |
| Phase 7 | Production Deploy — VPS + GitHub Actions + SSL | ⏳ |

---

## 🛠 Tech Stack (Actual Installed Versions)

```
Framework:      Next.js 16.2.6 (App Router + Turbopack)
Language:       TypeScript 5.9.3
Styling:        Tailwind CSS v4.2.4 (CSS-first config — NO tailwind.config.js)
UI Components:  shadcn/ui 4.7.0 (Radix preset + Nova theme)
ORM:            Prisma 7.8.0 (BREAKING CHANGES — see Critical Notes)
DB Adapter:     @prisma/adapter-pg 7.8.0 + pg 8.20.0
Database:       PostgreSQL 16-alpine (Docker)
Auth:           NextAuth.js 5.0.0-beta.31
Forms:          react-hook-form 7.75.0 + zod 4.4.3
Email:          Nodemailer 8.0.7
Icons:          lucide-react 1.14.0
Package Mgr:    pnpm 11.0.9
Runtime:        Node.js 22.22.2
OS (dev):       Windows 11 (D:\WORK\VSCODE\taxi-booking)
```

---

## ⚠️ Critical Notes — อ่านก่อนเขียน Code

### 1. Prisma 7 Breaking Changes
`url = env("DATABASE_URL")` **ไม่อยู่ใน schema.prisma แล้ว** — ย้ายไป `prisma.config.ts`

```typescript
// prisma.config.ts (root folder)
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: { url: process.env["DATABASE_URL"] },
  migrations: { path: 'prisma/migrations', seed: 'tsx prisma/seed.ts' },
})
```

```prisma
// schema.prisma — ไม่มี url ใน datasource
datasource db {
  provider = "postgresql"
  // url อยู่ใน prisma.config.ts แล้ว
}
```

### 2. Prisma 7 — db.ts ใช้ Adapter Pattern
```typescript
// src/lib/db.ts
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
```

### 3. Prisma 7 — seed.ts ต้องใช้ adapter ด้วย
```typescript
// prisma/seed.ts
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })
```

### 4. Tailwind v4 — CSS-first Configuration
**ไม่มี tailwind.config.ts** — config อยู่ใน `src/app/globals.css`

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  --color-navy-950: #020b18;
  --color-navy-900: #0a1628;   /* ← bg หลัก */
  --color-navy-800: #0f2040;
  --color-navy-700: #1a3a5c;
  --color-gold-500: #d4af37;   /* ← accent หลัก */
  --color-gold-400: #f4c430;
}
```

ใช้ inline hex ใน className เพราะ custom colors อาจไม่ resolve ใน dev:
```tsx
// ✅ ใช้แบบนี้ (reliable)
className="bg-[#0a1628] text-[#d4af37]"

// ⚠️ อาจใช้ได้หรือไม่ได้
className="bg-navy-900 text-gold-500"
```

### 5. pnpm 11 — ต้องมี pnpm-workspace.yaml
```yaml
# pnpm-workspace.yaml (root)
allowBuilds:
  "@prisma/engines": true
  msw: true
  prisma: true
  sharp: false
  unrs-resolver: false
ignoredBuiltDependencies:
  - sharp
  - unrs-resolver
```

### 6. Root Layout — ต้องมี `<html>` `<body>`
```tsx
// src/app/layout.tsx — ROOT layout เท่านั้น
export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}

// src/app/(public)/layout.tsx — PUBLIC layout
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a1628]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
```

### 7. Environment Variables (.env.local)
```env
DATABASE_URL="postgresql://taxi_user:taxi_pass_dev@localhost:5432/taxi_booking"
NEXTAUTH_SECRET="dev-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_TO="timetaxikhaolak@gmail.com"
ADMIN_EMAIL="admin@timetaxikhaolak.com"
ADMIN_PASSWORD="admin123"
```

---

## 🗄️ Database Schema (v3 — 9 Tables)

### PK Convention: `tablename_id` (ไม่ใช่ `id`)

```prisma
model Booking {
  bookingsId      Int            @id @default(autoincrement()) @map("bookings_id")
  bookingRef      String         @unique @default(cuid()) @map("booking_ref")
  fullName        String         @map("full_name")
  phoneCountry    String         @default("+66") @map("phone_country")
  phone           String
  email           String?
  adultPassengers Int            @default(1) @map("adult_passengers")
  childPassengers Int            @default(0) @map("child_passengers")
  pickupDate      DateTime       @map("pickup_date")
  pickupTime      String         @map("pickup_time")
  vehicleType     VehicleType    @map("vehicle_type")
  pickupType      PickupType     @map("pickup_type")
  pickupDetail    String?        @map("pickup_detail")
  dropoffLocation String         @map("dropoff_location")
  mapsLink        String?        @map("maps_link")
  contactChannel  ContactChannel @map("contact_channel")
  contactInfo     String         @map("contact_info")
  notes           String?
  status          BookingStatus  @default(PENDING)
  source          BookingSource  @default(WEBSITE)  // ← offline booking tracking
  createdAt       DateTime       @default(now()) @map("created_at")
  updatedAt       DateTime       @updatedAt @map("updated_at")
  @@map("bookings")
}
```

### Tables Summary

| Table | PK | FK | Seed |
|-------|----|----|------|
| bookings | bookings_id | — | (empty) |
| price_zones | price_zones_id | — | 7 rows |
| price_routes | price_routes_id | zone_id | 46 rows |
| reviews | reviews_id | — | 6 rows |
| faq_categories | faq_categories_id | — | 4 rows |
| faqs | faqs_id | category_id | 8 rows |
| attractions | attractions_id | — | 6 rows |
| admin_users | admin_users_id | — | 1 row (SUPER_ADMIN) |
| settings | settings_id | — | 7 rows |

### Enums (7 ตัว)

```prisma
enum VehicleType    { SEDAN SUV VAN }
enum PickupType     { AIRPORT HOTEL OTHER }
enum BookingStatus  { PENDING CONFIRMED COMPLETED CANCELLED }
enum ContactChannel { WHATSAPP LINE WECHAT EMAIL }
enum BookingSource  { WEBSITE WHATSAPP LINE PHONE FACEBOOK WECHAT }
enum ReviewSource   { TRIPADVISOR GOOGLE FACEBOOK DIRECT }
enum AdminRole      { SUPER_ADMIN ADMIN }
```

### Price Zones (7 zones, 46 routes)

| Zone | nameEn | Routes |
|------|--------|--------|
| 1 | Phuket Airport | 3 |
| 2 | Phuket Area | 19 |
| 3 | Surat-Thani Area | 7 |
| 4 | Krabi Area | 4 |
| 5 | Phang-Nga Area | 5 |
| 6 | Ranong Area | 3 |
| 7 | Additional Routes | 5 |

---

## 📁 Project Structure

```
taxi-booking/
├── docs/
│   ├── AI_Generated_Doc/      ← DOCX + PDF ที่ AI สร้าง
│   └── Web_References/        ← Screenshots ต้นแบบ
├── prisma/
│   ├── schema.prisma          ← 9 models + 7 enums
│   └── seed.ts                ← 7 zones + 46 routes + reviews + FAQs
├── prisma.config.ts           ← Prisma 7 config (DATABASE_URL + seed)
├── src/
│   ├── app/
│   │   ├── (public)/          ← Route Group: Navbar+Footer layout
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       ← Home (SSR) ✅
│   │   │   ├── about/         ← SSG ✅
│   │   │   ├── booking/       ← Phase 4 ⏳
│   │   │   ├── contact/       ← Static ✅
│   │   │   ├── price-list/    ← SSG ✅
│   │   │   ├── qa/            ← SSG ✅
│   │   │   ├── reviews/       ← SSR ✅
│   │   │   └── travel/        ← SSG ✅
│   │   ├── admin/             ← Phase 5 ⏳
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   └── booking/route.ts  ← Phase 4 ⏳
│   │   ├── globals.css
│   │   └── layout.tsx         ← ROOT: <html><body> + fonts
│   ├── components/
│   │   ├── booking/           ← Phase 4 ⏳
│   │   │   ├── BookingForm.tsx
│   │   │   └── VehicleSelector.tsx
│   │   ├── home/              ← ✅ Done
│   │   │   ├── FaqAccordion.tsx  ('use client')
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   └── VehicleCards.tsx
│   │   ├── layout/            ← ✅ Done
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx     ('use client' — mobile menu)
│   │   ├── price/             ← ✅ Done
│   │   │   └── PriceZoneTable.tsx
│   │   └── ui/
│   │       ├── button.tsx     (shadcn/ui)
│   │       └── WhatsAppButton.tsx  ← ✅ Done
│   ├── lib/
│   │   ├── auth.ts            ← Phase 5 ⏳
│   │   ├── db.ts              ← Prisma 7 adapter singleton ✅
│   │   ├── email.ts           ← Phase 4 ⏳
│   │   └── utils.ts           ← cn() helper ✅
│   ├── types/index.ts         ← Shared TypeScript types ✅
│   └── validations/booking.ts ← Zod schema (22 fields) ✅
├── .env.example
├── .env.local                 ← gitignored
├── .gitignore
├── components.json            ← shadcn/ui config
├── docker-compose.dev.yml     ← PostgreSQL + pgAdmin
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-workspace.yaml        ← allowBuilds config
├── postcss.config.mjs
└── README.md
```

---

## 🎨 Design System

```
Primary Background:  #0a1628  (navy-900)
Secondary Background: #0f2040 (navy-800)
Dark Background:     #020b18  (navy-950)
Card Border:         #1a3a5c  (navy-700)
Gold Accent:         #d4af37  (gold-500) — CTA, headings, highlights
Gold Hover:          #f4c430  (gold-400)
Text Primary:        #ffffff
Text Secondary:      rgba(255,255,255,0.7)
Text Muted:          rgba(255,255,255,0.4)
Success Green:       #25d366  (WhatsApp green)
TripAdvisor Green:   #00aa6c
```

---

## 📋 Coding Conventions

### TypeScript
- ใช้ `interface` สำหรับ object types
- ใช้ `type` สำหรับ union types, aliases
- ทุก function มี return type ที่ชัดเจน
- ไม่ใช้ `any` — ใช้ `unknown` หรือ type จริง

### React / Next.js
- Server Components by default (ไม่มี 'use client')
- 'use client' เฉพาะเมื่อใช้ useState, useEffect, event handlers
- Data fetching ใน Server Components โดยตรงผ่าน `db`
- SSG: `export const dynamic = 'force-static'`
- Metadata: export ใน server component

### ตัวอย่าง Server Component
```tsx
// Server Component — fetch data โดยตรง ไม่ต้องใช้ useEffect
export default async function PriceListPage() {
  const zones = await db.priceZone.findMany({
    where: { isActive: true },
    include: { routes: { where: { isActive: true } } },
    orderBy: { sortOrder: 'asc' },
  })
  return <div>...</div>
}
```

### ตัวอย่าง Client Component
```tsx
'use client'
import { useState } from 'react'

// ใช้เฉพาะเมื่อจำเป็นต้องมี interactivity
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)
  // ...
}
```

### Naming Conventions
- Components: `PascalCase.tsx`
- Functions/variables: `camelCase`
- DB columns: `snake_case` (via `@map()`)
- Prisma fields: `camelCase`
- Files: `kebab-case` สำหรับ pages, `PascalCase` สำหรับ components

### Import Order
```typescript
// 1. React/Next.js
import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

// 2. External packages
import { ChevronDown } from 'lucide-react'

// 3. Internal aliases
import { db } from '@/lib/db'
import { cn } from '@/lib/utils'

// 4. Types
import type { Booking } from '@prisma/client'
```

---

## 🚀 Common Commands

```bash
# Start development
pnpm dev

# Start database (Docker)
docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml down

# Prisma
npx prisma generate       # regenerate client after schema change
npx prisma db push         # sync schema to DB
npx prisma db seed         # run seed.ts
npx prisma studio          # visual DB browser (localhost:5555)

# Build
pnpm build
pnpm start

# Type check
pnpm tsc --noEmit
```

---

## 🔜 Phase 4 — Booking Form (ถัดไป)

### สิ่งที่ต้องสร้าง

**1. `src/app/(public)/booking/page.tsx`** — Booking page wrapper

**2. `src/components/booking/BookingForm.tsx`** — Main form ('use client')
```
Fields (22 fields):
- fullName, phoneCountry, phone, email
- adultPassengers, childPassengers
- pickupDate, pickupTime
- vehicleType (card selector — Sedan/SUV/Van)
- pickupType (radio — Airport/Hotel/Other)
- pickupDetail (conditional — ถ้า Airport: flight number, ถ้า Hotel: hotel name)
- dropoffLocation, mapsLink
- contactChannel (dropdown), contactInfo
- notes (textarea)
```

**3. `src/components/booking/VehicleSelector.tsx`** — Vehicle type card picker

**4. `src/app/api/booking/route.ts`** — POST handler
```typescript
// Validate with zod → INSERT to DB → Send email → Return response
```

**5. `src/lib/email.ts`** — Nodemailer setup
```typescript
// Gmail SMTP + HTML template
// ส่ง email ไปที่ admin (EMAIL_TO) เมื่อมีการจองใหม่
```

### Validation Schema (ใน `src/validations/booking.ts`)
Schema เขียนไว้แล้ว — ใช้ได้เลย

```typescript
export const bookingSchema = z.object({
  fullName: z.string().min(2),
  phoneCountry: z.string().default("+66"),
  phone: z.string().min(9).max(15),
  // ... (ดูในไฟล์)
})
```

### Flow
```
User กรอก form → react-hook-form validate (client)
→ POST /api/booking
→ Server: zod validate → db.booking.create()
→ Nodemailer ส่ง email แจ้ง admin
→ Return success/error
→ Show SweetAlert2 / toast notification
```

---

## 📞 Business Contact (ใน Settings DB)

```
WhatsApp: +66986822951
LINE: @timetaxikhaolak
Phone: 0986822951
Email: timetaxikhaolak@gmail.com
Facebook: Time Taxi Khao Lak
Location: Khao Lak, Phang Nga, Thailand
```

---

## 🐳 Docker Local Setup

```yaml
# docker-compose.dev.yml
services:
  db:
    image: postgres:16-alpine
    container_name: taxi_db_dev
    ports: ["5432:5432"]
    environment:
      POSTGRES_USER: taxi_user
      POSTGRES_PASSWORD: taxi_pass_dev
      POSTGRES_DB: taxi_booking

  pgadmin:
    image: dpage/pgadmin4
    container_name: taxi_pgadmin
    ports: ["8080:80"]
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@taxi.dev
      PGADMIN_DEFAULT_PASSWORD: admin123
```

---

## 📦 Deployment Plan (Phase 7)

- **Provider:** DigitalOcean Singapore (2GB RAM) — ~$12/month
- **CI/CD:** GitHub Actions → push `main` → SSH deploy
- **SSL:** Let's Encrypt (Certbot auto-renew)
- **Reverse Proxy:** Nginx
- **DB Backup:** pg_dump cron → Backblaze B2

---

## 🗂 Docs Folder

```
docs/
├── AI_Generated_Doc/
│   ├── taxi-booking-phase0-1.docx/.pdf
│   ├── taxi-db-documentation.docx/.pdf
│   ├── taxi-db-doc-v2.docx/.pdf
│   ├── taxi-phase2-v3.docx/.pdf
│   └── taxi-complete-doc.docx/.pdf
└── Web_References/
    ├── main.png             ← timetaxikhaolak.com home
    ├── booking.png          ← booking form
    ├── transfer-price-list.png
    └── about-us.png
```

---

*Last updated: Phase 3 Complete | Next: Phase 4 — Booking Form*
