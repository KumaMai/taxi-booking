CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE "VehicleType" AS ENUM ('SEDAN', 'SUV', 'VAN');
CREATE TYPE "PickupType" AS ENUM ('AIRPORT', 'HOTEL', 'OTHER');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "ContactChannel" AS ENUM ('WHATSAPP', 'LINE', 'WECHAT', 'EMAIL');
CREATE TYPE "BookingSource" AS ENUM ('WEBSITE', 'WHATSAPP', 'LINE', 'PHONE', 'FACEBOOK', 'WECHAT');
CREATE TYPE "ReviewSource" AS ENUM ('TRIPADVISOR', 'GOOGLE', 'FACEBOOK', 'DIRECT');
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

CREATE TABLE "bookings" (
    "bookings_id" SERIAL NOT NULL,
    "booking_ref" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_country" TEXT NOT NULL DEFAULT '+66',
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "adult_passengers" INTEGER NOT NULL DEFAULT 1,
    "child_passengers" INTEGER NOT NULL DEFAULT 0,
    "pickup_date" TIMESTAMP(3) NOT NULL,
    "pickup_time" TEXT NOT NULL,
    "vehicle_type" "VehicleType" NOT NULL,
    "pickup_type" "PickupType" NOT NULL,
    "pickup_detail" TEXT,
    "dropoff_location" TEXT NOT NULL,
    "maps_link" TEXT,
    "contact_channel" "ContactChannel" NOT NULL,
    "contact_info" TEXT NOT NULL,
    "notes" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "source" "BookingSource" NOT NULL DEFAULT 'WEBSITE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "bookings_pkey" PRIMARY KEY ("bookings_id")
);

CREATE TABLE "price_zones" (
    "price_zones_id" SERIAL NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_th" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "price_zones_pkey" PRIMARY KEY ("price_zones_id")
);

CREATE TABLE "price_routes" (
    "price_routes_id" SERIAL NOT NULL,
    "zone_id" INTEGER NOT NULL,
    "from_en" TEXT NOT NULL,
    "from_th" TEXT NOT NULL,
    "to_en" TEXT NOT NULL,
    "to_th" TEXT NOT NULL,
    "price_standard" INTEGER NOT NULL,
    "price_suv" INTEGER NOT NULL,
    "price_van" INTEGER NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "price_routes_pkey" PRIMARY KEY ("price_routes_id")
);

CREATE TABLE "reviews" (
    "reviews_id" SERIAL NOT NULL,
    "reviewer_name" TEXT NOT NULL,
    "review_text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "source" "ReviewSource" NOT NULL DEFAULT 'DIRECT',
    "photo_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reviews_pkey" PRIMARY KEY ("reviews_id")
);

CREATE TABLE "faq_categories" (
    "faq_categories_id" SERIAL NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_th" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "faq_categories_pkey" PRIMARY KEY ("faq_categories_id")
);

CREATE TABLE "faqs" (
    "faqs_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "question_en" TEXT NOT NULL,
    "question_th" TEXT NOT NULL,
    "answer_en" TEXT NOT NULL,
    "answer_th" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "faqs_pkey" PRIMARY KEY ("faqs_id")
);

CREATE TABLE "attractions" (
    "attractions_id" SERIAL NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_th" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_th" TEXT NOT NULL,
    "image_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "attractions_pkey" PRIMARY KEY ("attractions_id")
);

CREATE TABLE "admin_users" (
    "admin_users_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("admin_users_id")
);

CREATE TABLE "settings" (
    "settings_id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "settings_pkey" PRIMARY KEY ("settings_id")
);

CREATE UNIQUE INDEX "bookings_booking_ref_key" ON "bookings"("booking_ref");
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

ALTER TABLE "price_routes" ADD CONSTRAINT "price_routes_zone_id_fkey"
FOREIGN KEY ("zone_id") REFERENCES "price_zones"("price_zones_id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "faqs" ADD CONSTRAINT "faqs_category_id_fkey"
FOREIGN KEY ("category_id") REFERENCES "faq_categories"("faq_categories_id")
ON DELETE RESTRICT ON UPDATE CASCADE;
