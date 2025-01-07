/*
  Warnings:

  - You are about to drop the column `soilTime` on the `sample` table. All the data in the column will be lost.
  - Added the required column `soilType` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sample` DROP COLUMN `soilTime`,
    ADD COLUMN `soilType` INTEGER NOT NULL;
