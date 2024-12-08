/*
  Warnings:

  - Made the column `positionDataIdPositionData` on table `linkage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `linkage` DROP FOREIGN KEY `Linkage_positionDataIdPositionData_fkey`;

-- AlterTable
ALTER TABLE `linkage` MODIFY `positionDataIdPositionData` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_positionDataIdPositionData_fkey` FOREIGN KEY (`positionDataIdPositionData`) REFERENCES `PositionData`(`idPositionData`) ON DELETE RESTRICT ON UPDATE CASCADE;
