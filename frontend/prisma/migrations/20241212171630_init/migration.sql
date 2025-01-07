/*
  Warnings:

  - You are about to drop the column `longitued` on the `address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `longitued`,
    ADD COLUMN `longitude` DOUBLE NULL;
