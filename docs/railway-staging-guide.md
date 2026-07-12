# Railway + PostgreSQL Staging Guide

คู่มือนี้ใช้สำหรับ deploy ระบบทดสอบของ `taxi-booking` บน Railway โดยแยกจาก production

## เป้าหมาย

เราจะสร้าง:

- Railway project: `taxi-booking-staging`
- PostgreSQL สำหรับ staging แยกต่างหาก
- Next.js service จาก GitHub repository
- Railway domain ชั่วคราว
- SMTP และ Admin credentials สำหรับทดสอบเท่านั้น

ห้ามใช้ production database, production secrets หรืออีเมลลูกค้าจริงใน staging

## 1. เตรียมบัญชี

1. เข้า [railway.app](https://railway.app)
2. เลือก **Continue with GitHub**
3. อนุญาต Railway ให้เข้าถึง repository
4. ตรวจสอบว่ามี repository `KumaMai/taxi-booking`

## 2. สร้าง staging project

1. กด **New Project**
2. เลือก **Empty Project**
3. ตั้งชื่อ `taxi-booking-staging`

อย่าใช้ชื่อ production เพื่อป้องกันการตั้งค่าปะปนกัน

## 3. เพิ่ม PostgreSQL

ใน project:

1. กด **+ New**
2. เลือก **Database → PostgreSQL**
3. รอจน service เป็น `Success`

Railway จะสร้าง `DATABASE_URL` และตัวแปร PostgreSQL อื่น ๆ ให้อัตโนมัติ ใช้ `DATABASE_URL` เป็นหลัก

อ้างอิง: [Railway PostgreSQL docs](https://docs.railway.com/databases/postgresql)

## 4. เพิ่ม Next.js service จาก GitHub

1. กด **+ New**
2. เลือก **GitHub Repo**
3. เลือก `KumaMai/taxi-booking`
4. เลือก branch `main` หรือ branch `staging` ถ้าสร้างไว้แยกต่างหาก

### สำคัญก่อนกด Deploy

Railway build จาก GitHub snapshot ไม่ใช่ไฟล์ local ในเครื่อง ถ้ามีการแก้ repo หลังจาก clone ต้อง commit และ push ก่อน:

```powershell
git add .
git commit -m "chore: prepare Railway staging deployment"
git push origin main
```

ตรวจใน GitHub ว่า commit ล่าสุดมี `pnpm-workspace.yaml` ที่ประกอบด้วย:

```yaml
packages:
  - "."
```

ถ้า log Railway ขึ้น `packages field missing or empty` แปลว่า Railway ยังดึง commit เก่าที่ไม่มี `packages` ให้เลือก branch/commit ใหม่แล้วกด redeploy

## 5. ตั้งค่า build และ migration

ไปที่ **Service → Settings → Deploy** แล้วตั้งค่า:

```text
Build Command:
pnpm build
```

```text
Start Command:
pnpm start
```

```text
Pre-deploy Command:
pnpm exec prisma migrate deploy
```

The repository build script already runs `prisma generate` before `next build`, so a clean Railway builder can generate Prisma Client before Next.js type-checks `prisma/seed.ts`.

Pre-deploy command ต้องสำเร็จก่อน service จะเริ่มทำงาน

อ้างอิง: [Railway pre-deploy command](https://docs.railway.com/deployments/pre-deploy-command)

## 6. เชื่อมต่อ PostgreSQL

ใน Next.js service:

1. ไปที่ **Variables**
2. กด **Add Reference Variable**
3. เลือก PostgreSQL service
4. เลือก `DATABASE_URL`

ไม่ต้อง copy password ลง GitHub หรือใน source code

## 7. เพิ่ม environment variables

เพิ่มค่าต่อไปนี้ใน **Next.js service → Variables**

### พื้นฐาน

```text
NEXTAUTH_SECRET=<สุ่มค่าใหม่สำหรับ staging ยาวอย่างน้อย 32 ตัวอักษร>
NEXTAUTH_URL=https://<railway-domain>
AUTH_URL=https://<railway-domain>
AUTH_TRUST_HOST=true
NEXT_PUBLIC_SITE_URL=https://<railway-domain>
```

### Email ทดสอบ

```text
EMAIL_USER=<SMTP username>
EMAIL_PASS=<SMTP app password หรือ sandbox password>
EMAIL_TO=<อีเมลของผู้ทดสอบเท่านั้น>
```

### Admin ทดสอบ

```text
ADMIN_EMAIL=<อีเมล admin staging>
ADMIN_PASSWORD=<รหัสผ่าน admin staging>
```

### Distributed rate limiting

```text
UPSTASH_REDIS_REST_URL=<ถ้ามี>
UPSTASH_REDIS_REST_TOKEN=<ถ้ามี>
```

ถ้าไม่ตั้งค่า Upstash ระบบจะใช้ local fallback ซึ่งเหมาะกับการทดสอบเบื้องต้นเท่านั้น

## 8. Deploy ครั้งแรก

1. กด **Deploy**
2. เปิด **Deployments**
3. ตรวจ log ตามลำดับ:

```text
Install dependencies
Prisma generate
Next build
Prisma migrate deploy
Next start
```

ถ้า migration ล้มเหลว ให้แก้สาเหตุจาก log ก่อน อย่ารัน seed แบบสุ่มซ้ำ

## 9. สร้าง Railway domain

ไปที่ **Settings → Networking → Generate Domain**

ตัวอย่าง:

```text
https://taxi-booking-staging.up.railway.app
```

จากนั้นแก้ค่าเหล่านี้ให้ตรงกับ domain จริง แล้ว redeploy:

```text
NEXTAUTH_URL
AUTH_URL
NEXT_PUBLIC_SITE_URL
```

## 10. ตรวจระบบหลัง deploy

### Health check

เปิด:

```text
https://<railway-domain>/api/health
```

ควรได้ HTTP 200 และ JSON ที่มี `ok: true`

### Public pages

ตรวจ:

```text
/
/booking
/about
/contact
/price-list
/qa
/reviews
/travel
```

### ภาษา

1. เปิดหน้าแรก
2. กด Thai toggle
3. ตรวจ Navbar, Hero, vehicle cards, reviews และ booking
4. สลับกลับ English

### Booking

1. ใช้ข้อมูลทดสอบเท่านั้น
2. เลือกวันในอนาคต
3. ส่ง booking
4. ตรวจ booking reference
5. ตรวจ Admin dashboard
6. ตรวจอีเมลใน `EMAIL_TO`

### Admin

เปิด `/admin/login` แล้วตรวจ:

- Login
- Dashboard
- Bookings
- Notification status
- Retry email
- Audit Logs
- Settings
- Prices
- FAQ
- Reviews

## 11. รัน smoke test จากเครื่อง

PowerShell:

```powershell
$env:BASE_URL="https://<railway-domain>"
pnpm smoke
pnpm check:production-env
```

`check:production-env` จะ fail หาก secret ขาด, `NEXTAUTH_SECRET` สั้นเกินไป หรือ URL ไม่ใช่ HTTPS

## 12. ข้อห้ามใน staging

- ห้ามใช้ production database
- ห้ามใช้ `NEXTAUTH_SECRET` เดียวกับ production
- ห้ามใช้ Admin password เดียวกับ production
- ห้ามส่ง email ไปหาลูกค้าจริง
- ห้ามใช้ข้อมูลลูกค้าจริง
- ห้ามใช้ staging URL เป็น production canonical URL

## ปัญหาที่พบบ่อย

### Prisma Client ไม่พบ

ตรวจ Build Command:

```text
pnpm prisma generate && pnpm build
```

### `DATABASE_URL` ไม่พบ

ตรวจว่า App service มี reference variable จาก PostgreSQL service แล้ว

### `/api/health` ได้ 503

ตรวจ `DATABASE_URL`, PostgreSQL service status และ migration log

### Login เด้งกลับหน้าเดิม

ตรวจว่า `NEXTAUTH_URL`, `AUTH_URL` และ `NEXT_PUBLIC_SITE_URL` เป็น HTTPS domain เดียวกัน

## ผ่าน staging แล้วทำอะไรต่อ

1. สร้าง Railway production project แยก
2. สร้าง PostgreSQL production แยก
3. สร้าง secrets ใหม่ทั้งหมด
4. ใช้ SMTP production ที่ตรวจสอบแล้ว
5. ตั้ง custom domain
6. ตั้ง backup และ monitoring
7. Deploy production หลัง staging ผ่านทุกข้อ

## เอกสารอ้างอิง

- [Railway Next.js + PostgreSQL guide](https://docs.railway.com/guides/nextjs)
- [Railway PostgreSQL](https://docs.railway.com/databases/postgresql)
- [Railway pre-deploy commands](https://docs.railway.com/deployments/pre-deploy-command)
