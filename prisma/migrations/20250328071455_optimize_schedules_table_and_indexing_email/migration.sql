/*
  Warnings:

  - You are about to drop the column `days_of_week` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `time_of_day` on the `schedules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cron_expression` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "days_of_week",
DROP COLUMN "time_of_day",
ADD COLUMN     "cron_expression" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_hash" TEXT,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
