/*
  Warnings:

  - The primary key for the `sample` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `soilTime` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `soilResistivity` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.
  - You are about to alter the column `moistureContent` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `pHValue` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Int`.
  - You are about to alter the column `bufferCapacityPH4_3` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `bufferCapacityPH7_0` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `sulfurReducingBacteria` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `sulfateContent` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `neutralSalts` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `undergroundWaterPresence` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `horizontalSoilHomogeneity` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `verticalSoilHomogeneity` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `soilTypeHomogeneity` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `pHSoilHomogeneity` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `externalCathodes` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to alter the column `b0` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `b1` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `sample` DROP PRIMARY KEY,
    MODIFY `sampleId` VARCHAR(191) NOT NULL,
    MODIFY `soilTime` INTEGER NOT NULL,
    MODIFY `soilResistivity` INTEGER NOT NULL,
    MODIFY `moistureContent` INTEGER NOT NULL,
    MODIFY `pHValue` INTEGER NOT NULL,
    MODIFY `bufferCapacityPH4_3` INTEGER NOT NULL,
    MODIFY `bufferCapacityPH7_0` INTEGER NOT NULL,
    MODIFY `sulfurReducingBacteria` INTEGER NOT NULL,
    MODIFY `sulfateContent` INTEGER NOT NULL,
    MODIFY `neutralSalts` INTEGER NOT NULL,
    MODIFY `undergroundWaterPresence` INTEGER NOT NULL,
    MODIFY `horizontalSoilHomogeneity` INTEGER NOT NULL,
    MODIFY `verticalSoilHomogeneity` INTEGER NOT NULL,
    MODIFY `soilTypeHomogeneity` INTEGER NOT NULL,
    MODIFY `pHSoilHomogeneity` INTEGER NOT NULL,
    MODIFY `externalCathodes` INTEGER NOT NULL,
    MODIFY `b0` INTEGER NOT NULL,
    MODIFY `b1` INTEGER NOT NULL,
    ADD PRIMARY KEY (`sampleId`);
