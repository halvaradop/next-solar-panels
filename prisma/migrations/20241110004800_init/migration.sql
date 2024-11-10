/*
  Warnings:

  - You are about to alter the column `pHSoilHomogeneity` on the `samples` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE `samples` MODIFY `soilTypeHomogeneity` VARCHAR(50) NOT NULL,
    MODIFY `pHSoilHomogeneity` DECIMAL(5, 2) NOT NULL;
