/*
  Warnings:

  - You are about to alter the column `b0` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `b1` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z1` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z10` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z11` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z12` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z13` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z14` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z15` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z2` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z3` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z4` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z5` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z6` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z7` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z8` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `z9` on the `positionsoildata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `roleName` on the `role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `ContactPerson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `StakeHolder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chlorides` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `positionsoildata` ADD COLUMN `chlorides` DOUBLE NOT NULL,
    MODIFY `b0` DOUBLE NOT NULL,
    MODIFY `b1` DOUBLE NOT NULL,
    MODIFY `z1` DOUBLE NOT NULL,
    MODIFY `z10` DOUBLE NOT NULL,
    MODIFY `z11` DOUBLE NOT NULL,
    MODIFY `z12` DOUBLE NOT NULL,
    MODIFY `z13` DOUBLE NOT NULL,
    MODIFY `z14` DOUBLE NOT NULL,
    MODIFY `z15` DOUBLE NOT NULL,
    MODIFY `z2` DOUBLE NOT NULL,
    MODIFY `z3` DOUBLE NOT NULL,
    MODIFY `z4` DOUBLE NOT NULL,
    MODIFY `z5` DOUBLE NOT NULL,
    MODIFY `z6` DOUBLE NOT NULL,
    MODIFY `z7` DOUBLE NOT NULL,
    MODIFY `z8` DOUBLE NOT NULL,
    MODIFY `z9` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `roleName`,
    ADD COLUMN `name` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ContactPerson_email_key` ON `ContactPerson`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `StakeHolder_email_key` ON `StakeHolder`(`email`);
