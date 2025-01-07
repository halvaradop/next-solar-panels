/*
  Warnings:

  - The primary key for the `field` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fieldId` on the `field` table. All the data in the column will be lost.
  - You are about to drop the column `idAddress` on the `linkage` table. All the data in the column will be lost.
  - You are about to drop the column `idField` on the `linkage` table. All the data in the column will be lost.
  - You are about to drop the column `idPositionMeasurement` on the `linkage` table. All the data in the column will be lost.
  - You are about to drop the column `idPositionResistivity` on the `linkage` table. All the data in the column will be lost.
  - You are about to drop the column `idProject` on the `linkage` table. All the data in the column will be lost.
  - You are about to drop the column `positionDataIdPositionData` on the `linkage` table. All the data in the column will be lost.
  - You are about to drop the column `positionSoilDataPositionSoilDataId` on the `linkage` table. All the data in the column will be lost.
  - The primary key for the `phonecontactperson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contactPersonIdContactPerson` on the `phonecontactperson` table. All the data in the column will be lost.
  - You are about to drop the column `phoneId` on the `phonecontactperson` table. All the data in the column will be lost.
  - You are about to alter the column `pointType` on the `positiondata` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(7))`.
  - You are about to alter the column `grounding` on the `positiondata` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - The primary key for the `positionsoildata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `positionSoilDataId` on the `positionsoildata` table. All the data in the column will be lost.
  - Added the required column `designation` to the `Field` table without a default value. This is not possible if the table is not empty.
  - The required column `idField` was added to the `Field` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `idProject` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPositionData` to the `Linkage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Linkage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idContactPerson` to the `PhoneContactPerson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPhone` to the `PhoneContactPerson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idField` to the `PositionData` table without a default value. This is not possible if the table is not empty.
  - The required column `idPositionSoilData` was added to the `PositionSoilData` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `idAddress` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `StakeHolder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `linkage` DROP FOREIGN KEY `Linkage_idAddress_fkey`;

-- DropForeignKey
ALTER TABLE `linkage` DROP FOREIGN KEY `Linkage_idField_fkey`;

-- DropForeignKey
ALTER TABLE `linkage` DROP FOREIGN KEY `Linkage_idPositionMeasurement_fkey`;

-- DropForeignKey
ALTER TABLE `linkage` DROP FOREIGN KEY `Linkage_idPositionResistivity_fkey`;

-- DropForeignKey
ALTER TABLE `linkage` DROP FOREIGN KEY `Linkage_idProject_fkey`;

-- DropForeignKey
ALTER TABLE `linkage` DROP FOREIGN KEY `Linkage_positionDataIdPositionData_fkey`;

-- DropForeignKey
ALTER TABLE `linkage` DROP FOREIGN KEY `Linkage_positionSoilDataPositionSoilDataId_fkey`;

-- DropForeignKey
ALTER TABLE `phonecontactperson` DROP FOREIGN KEY `PhoneContactPerson_contactPersonIdContactPerson_fkey`;

-- DropForeignKey
ALTER TABLE `stakeholder` DROP FOREIGN KEY `StakeHolder_idPicture_fkey`;

-- AlterTable
ALTER TABLE `address` ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitued` DOUBLE NULL,
    MODIFY `country` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `postbox` VARCHAR(191) NULL,
    MODIFY `street` VARCHAR(191) NULL,
    MODIFY `number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `contactperson` MODIFY `fax` VARCHAR(191) NULL,
    MODIFY `www` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `field` DROP PRIMARY KEY,
    DROP COLUMN `fieldId`,
    ADD COLUMN `designation` VARCHAR(191) NOT NULL,
    ADD COLUMN `idField` VARCHAR(191) NOT NULL,
    ADD COLUMN `idProject` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idField`);

-- AlterTable
ALTER TABLE `linkage` DROP COLUMN `idAddress`,
    DROP COLUMN `idField`,
    DROP COLUMN `idPositionMeasurement`,
    DROP COLUMN `idPositionResistivity`,
    DROP COLUMN `idProject`,
    DROP COLUMN `positionDataIdPositionData`,
    DROP COLUMN `positionSoilDataPositionSoilDataId`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `idPositionData` VARCHAR(191) NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `phonecontactperson` DROP PRIMARY KEY,
    DROP COLUMN `contactPersonIdContactPerson`,
    DROP COLUMN `phoneId`,
    ADD COLUMN `idContactPerson` VARCHAR(191) NOT NULL,
    ADD COLUMN `idPhone` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`idPhone`);

-- AlterTable
ALTER TABLE `positiondata` ADD COLUMN `idField` VARCHAR(191) NOT NULL,
    MODIFY `pointType` ENUM('FIELD', 'ZONE', 'MEASUREMENT', 'POI') NOT NULL,
    MODIFY `grounding` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `positionsoildata` DROP PRIMARY KEY,
    DROP COLUMN `positionSoilDataId`,
    ADD COLUMN `idPositionSoilData` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idPositionSoilData`);

-- AlterTable
ALTER TABLE `project` ADD COLUMN `idAddress` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `stakeholder` ADD COLUMN `type` ENUM('CLIENT', 'SUPPLIER', 'SERVICE_PROVIDER', 'GOVT_INSTANCE') NOT NULL,
    MODIFY `fax` VARCHAR(191) NULL,
    MODIFY `www` VARCHAR(191) NULL,
    MODIFY `idPicture` INTEGER NULL;

-- CreateTable
CREATE TABLE `PhoneStakeHolder` (
    `idPhone` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `stakeHolderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPhone`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PositionMeasurementOnLinkage` (
    `idLinkage` VARCHAR(191) NOT NULL,
    `idPositionMeasurement` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPositionMeasurement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PositionResistivityOnLinkage` (
    `idLinkage` VARCHAR(191) NOT NULL,
    `idPositionResistivity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPositionResistivity`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PositionSoilDataOnLinkage` (
    `idLinkage` VARCHAR(191) NOT NULL,
    `idPositionSoilData` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPositionSoilData`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PhoneStakeHolder` ADD CONSTRAINT `PhoneStakeHolder_stakeHolderId_fkey` FOREIGN KEY (`stakeHolderId`) REFERENCES `StakeHolder`(`idStakeHolder`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StakeHolder` ADD CONSTRAINT `StakeHolder_idPicture_fkey` FOREIGN KEY (`idPicture`) REFERENCES `Picture`(`idPicture`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_idAddress_fkey` FOREIGN KEY (`idAddress`) REFERENCES `Address`(`idAddress`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneContactPerson` ADD CONSTRAINT `PhoneContactPerson_idContactPerson_fkey` FOREIGN KEY (`idContactPerson`) REFERENCES `ContactPerson`(`idContactPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_idProject_fkey` FOREIGN KEY (`idProject`) REFERENCES `Project`(`idProject`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionData` ADD CONSTRAINT `PositionData_idField_fkey` FOREIGN KEY (`idField`) REFERENCES `Field`(`idField`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionMeasurementOnLinkage` ADD CONSTRAINT `PositionMeasurementOnLinkage_idLinkage_fkey` FOREIGN KEY (`idLinkage`) REFERENCES `Linkage`(`idLinkage`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionMeasurementOnLinkage` ADD CONSTRAINT `PositionMeasurementOnLinkage_idPositionMeasurement_fkey` FOREIGN KEY (`idPositionMeasurement`) REFERENCES `PositionMeasurement`(`idPositionMeasurement`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionResistivityOnLinkage` ADD CONSTRAINT `PositionResistivityOnLinkage_idLinkage_fkey` FOREIGN KEY (`idLinkage`) REFERENCES `Linkage`(`idLinkage`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionResistivityOnLinkage` ADD CONSTRAINT `PositionResistivityOnLinkage_idPositionResistivity_fkey` FOREIGN KEY (`idPositionResistivity`) REFERENCES `PositionResistivity`(`idPositionResistivity`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionSoilDataOnLinkage` ADD CONSTRAINT `PositionSoilDataOnLinkage_idLinkage_fkey` FOREIGN KEY (`idLinkage`) REFERENCES `Linkage`(`idLinkage`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionSoilDataOnLinkage` ADD CONSTRAINT `PositionSoilDataOnLinkage_idPositionSoilData_fkey` FOREIGN KEY (`idPositionSoilData`) REFERENCES `PositionSoilData`(`idPositionSoilData`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_idPositionData_fkey` FOREIGN KEY (`idPositionData`) REFERENCES `PositionData`(`idPositionData`) ON DELETE RESTRICT ON UPDATE CASCADE;
