/*
  Warnings:

  - You are about to alter the column `b0` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.
  - You are about to alter the column `b1` on the `sample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `sample` MODIFY `b0` DECIMAL(65, 30) NOT NULL,
    MODIFY `b1` DECIMAL(65, 30) NOT NULL;
