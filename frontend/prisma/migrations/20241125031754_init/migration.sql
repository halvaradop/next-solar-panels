/*
  Warnings:

  - You are about to alter the column `undergroundWaterPresence` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Decimal(5,2)`.
  - You are about to alter the column `soilTypeHomogeneity` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE `sample` MODIFY `undergroundWaterPresence` DECIMAL(5, 2) NOT NULL,
    MODIFY `soilTypeHomogeneity` DECIMAL(5, 2) NOT NULL;
