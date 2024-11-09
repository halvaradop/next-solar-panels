/*
  Warnings:

  - Added the required column `name` to the `Zones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Zones` ADD COLUMN `name` VARCHAR(50) NOT NULL;
