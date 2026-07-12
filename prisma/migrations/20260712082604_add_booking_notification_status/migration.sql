-- CreateEnum
CREATE TYPE "BookingNotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "notification_attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "notification_last_error" TEXT,
ADD COLUMN     "notification_sent_at" TIMESTAMP(3),
ADD COLUMN     "notification_status" "BookingNotificationStatus" NOT NULL DEFAULT 'PENDING';
