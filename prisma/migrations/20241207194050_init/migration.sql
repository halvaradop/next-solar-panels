/*
  Warnings:

  - The primary key for the `address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addressId` on the `address` table. All the data in the column will be lost.
  - You are about to alter the column `isActive` on the `address` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(7))`.
  - The primary key for the `auditlog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `auditId` on the `auditlog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `auditlog` table. All the data in the column will be lost.
  - The values [DELETED] on the enum `AuditLog_state` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addressId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `clientsId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `project` table. All the data in the column will be lost.
  - The values [DELETED] on the enum `AuditLog_state` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `role` table. All the data in the column will be lost.
  - The values [DELETED] on the enum `AuditLog_state` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `phone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projectsonusers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rolespermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sample` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zone` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idAddress` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idAudit` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idContactPerson` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idContactPerson` to the `Project` table without a default value. This is not possible if the table is not empty.
  - The required column `idProject` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `idStakeholder` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idRole` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `auditlog` DROP FOREIGN KEY `AuditLog_userId_fkey`;

-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `Client_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `Client_userId_fkey`;

-- DropForeignKey
ALTER TABLE `phone` DROP FOREIGN KEY `Phone_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `phone` DROP FOREIGN KEY `Phone_userId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_clientsId_fkey`;

-- DropForeignKey
ALTER TABLE `projectsonusers` DROP FOREIGN KEY `ProjectsOnUsers_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `projectsonusers` DROP FOREIGN KEY `ProjectsOnUsers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `rolespermission` DROP FOREIGN KEY `RolesPermission_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `rolespermission` DROP FOREIGN KEY `RolesPermission_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `sample` DROP FOREIGN KEY `Sample_userId_fkey`;

-- DropForeignKey
ALTER TABLE `sample` DROP FOREIGN KEY `Sample_zoneId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `zone` DROP FOREIGN KEY `Zone_projectId_fkey`;

-- AlterTable
ALTER TABLE `address` DROP PRIMARY KEY,
    DROP COLUMN `addressId`,
    ADD COLUMN `idAddress` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `isActive` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    ADD PRIMARY KEY (`idAddress`);

-- AlterTable
ALTER TABLE `auditlog` DROP PRIMARY KEY,
    DROP COLUMN `auditId`,
    DROP COLUMN `userId`,
    ADD COLUMN `idAudit` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `idContactPerson` VARCHAR(191) NOT NULL,
    MODIFY `state` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    ADD PRIMARY KEY (`idAudit`);

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    DROP COLUMN `addressId`,
    DROP COLUMN `clientsId`,
    DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    DROP COLUMN `name`,
    DROP COLUMN `projectId`,
    ADD COLUMN `designation` VARCHAR(191) NOT NULL,
    ADD COLUMN `idContactPerson` VARCHAR(191) NOT NULL,
    ADD COLUMN `idProject` VARCHAR(191) NOT NULL,
    ADD COLUMN `idStakeholder` VARCHAR(191) NOT NULL,
    MODIFY `state` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    ADD PRIMARY KEY (`idProject`);

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    DROP COLUMN `roleId`,
    ADD COLUMN `idRole` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `state` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    ADD PRIMARY KEY (`idRole`);

-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `permission`;

-- DropTable
DROP TABLE `phone`;

-- DropTable
DROP TABLE `projectsonusers`;

-- DropTable
DROP TABLE `rolespermission`;

-- DropTable
DROP TABLE `sample`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `zone`;

-- CreateTable
CREATE TABLE `Picture` (
    `idPicture` INTEGER NOT NULL AUTO_INCREMENT,
    `idStakeholder` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `pictureFile` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPicture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StakeHolder` (
    `idStakeHolder` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `industry` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `fax` VARCHAR(191) NOT NULL,
    `www` VARCHAR(191) NOT NULL,
    `state` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `idAddress` INTEGER NOT NULL,
    `idContactPerson` VARCHAR(191) NOT NULL,
    `idPicture` INTEGER NOT NULL,

    PRIMARY KEY (`idStakeHolder`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhoneContactPerson` (
    `phoneId` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `contactPersonIdContactPerson` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`phoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactPerson` (
    `idContactPerson` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `fax` VARCHAR(191) NOT NULL,
    `www` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `state` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `idRole` INTEGER NOT NULL,

    PRIMARY KEY (`idContactPerson`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `fieldId` VARCHAR(191) NOT NULL,
    `fence` BOOLEAN NOT NULL,
    `connectionEarthingFence` BOOLEAN NOT NULL,
    `externalCurrentInfluence` BOOLEAN NOT NULL,
    `state` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `idAddress` INTEGER NOT NULL,

    PRIMARY KEY (`fieldId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PositionData` (
    `idPositionData` VARCHAR(191) NOT NULL,
    `pointType` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `pileDesignation` VARCHAR(191) NOT NULL,
    `pointDesignation` VARCHAR(191) NOT NULL,
    `grounding` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPositionData`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PositionMeasurement` (
    `idPositionMeasurement` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `potentialVr` DOUBLE NOT NULL,
    `potentialVOn` DOUBLE NOT NULL,
    `potentialVOff` DOUBLE NOT NULL,
    `galvanicCurrent` DOUBLE NOT NULL,
    `coatingThickness` DOUBLE NOT NULL,
    `materialTrickness` DOUBLE NOT NULL,
    `idContactPerson` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPositionMeasurement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PositionResistivity` (
    `idPositionResistivity` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `depth` DOUBLE NOT NULL,
    `orientation` DOUBLE NOT NULL,
    `value` DOUBLE NOT NULL,
    `measurementInstrument` VARCHAR(191) NOT NULL,
    `idContactPerson` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPositionResistivity`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PositionSoilData` (
    `positionSoilDataId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `Z1` INTEGER NOT NULL,
    `Z2` INTEGER NOT NULL,
    `Z3` INTEGER NOT NULL,
    `Z4` INTEGER NOT NULL,
    `Z5` INTEGER NOT NULL,
    `Z6` INTEGER NOT NULL,
    `Z7` INTEGER NOT NULL,
    `Z8` INTEGER NOT NULL,
    `Z9` INTEGER NOT NULL,
    `Z10` INTEGER NOT NULL,
    `Z11` INTEGER NOT NULL,
    `Z12` INTEGER NOT NULL,
    `Z13` INTEGER NOT NULL,
    `Z14` INTEGER NOT NULL,
    `Z15` INTEGER NOT NULL,
    `b0` INTEGER NOT NULL,
    `b1` INTEGER NOT NULL,
    `idContactPerson` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`positionSoilDataId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Linkage` (
    `idLinkage` VARCHAR(191) NOT NULL,
    `idProject` VARCHAR(191) NOT NULL,
    `idPositionMeasurement` VARCHAR(191) NOT NULL,
    `idPositionResistivity` VARCHAR(191) NOT NULL,
    `idField` VARCHAR(191) NOT NULL,
    `idAddress` INTEGER NOT NULL,
    `positionSoilDataPositionSoilDataId` VARCHAR(191) NOT NULL,
    `positionDataIdPositionData` VARCHAR(191) NULL,

    PRIMARY KEY (`idLinkage`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StakeHolder` ADD CONSTRAINT `StakeHolder_idAddress_fkey` FOREIGN KEY (`idAddress`) REFERENCES `Address`(`idAddress`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StakeHolder` ADD CONSTRAINT `StakeHolder_idContactPerson_fkey` FOREIGN KEY (`idContactPerson`) REFERENCES `ContactPerson`(`idContactPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StakeHolder` ADD CONSTRAINT `StakeHolder_idPicture_fkey` FOREIGN KEY (`idPicture`) REFERENCES `Picture`(`idPicture`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_idContactPerson_fkey` FOREIGN KEY (`idContactPerson`) REFERENCES `ContactPerson`(`idContactPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_idStakeholder_fkey` FOREIGN KEY (`idStakeholder`) REFERENCES `StakeHolder`(`idStakeHolder`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneContactPerson` ADD CONSTRAINT `PhoneContactPerson_contactPersonIdContactPerson_fkey` FOREIGN KEY (`contactPersonIdContactPerson`) REFERENCES `ContactPerson`(`idContactPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactPerson` ADD CONSTRAINT `ContactPerson_idRole_fkey` FOREIGN KEY (`idRole`) REFERENCES `Role`(`idRole`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_idAddress_fkey` FOREIGN KEY (`idAddress`) REFERENCES `Address`(`idAddress`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionMeasurement` ADD CONSTRAINT `PositionMeasurement_idContactPerson_fkey` FOREIGN KEY (`idContactPerson`) REFERENCES `ContactPerson`(`idContactPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionResistivity` ADD CONSTRAINT `PositionResistivity_idContactPerson_fkey` FOREIGN KEY (`idContactPerson`) REFERENCES `ContactPerson`(`idContactPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PositionSoilData` ADD CONSTRAINT `PositionSoilData_idContactPerson_fkey` FOREIGN KEY (`idContactPerson`) REFERENCES `ContactPerson`(`idContactPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_idProject_fkey` FOREIGN KEY (`idProject`) REFERENCES `Project`(`idProject`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_idPositionMeasurement_fkey` FOREIGN KEY (`idPositionMeasurement`) REFERENCES `PositionMeasurement`(`idPositionMeasurement`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_idPositionResistivity_fkey` FOREIGN KEY (`idPositionResistivity`) REFERENCES `PositionResistivity`(`idPositionResistivity`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_idField_fkey` FOREIGN KEY (`idField`) REFERENCES `Field`(`fieldId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_idAddress_fkey` FOREIGN KEY (`idAddress`) REFERENCES `Address`(`idAddress`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_positionSoilDataPositionSoilDataId_fkey` FOREIGN KEY (`positionSoilDataPositionSoilDataId`) REFERENCES `PositionSoilData`(`positionSoilDataId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Linkage` ADD CONSTRAINT `Linkage_positionDataIdPositionData_fkey` FOREIGN KEY (`positionDataIdPositionData`) REFERENCES `PositionData`(`idPositionData`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_idContactPerson_fkey` FOREIGN KEY (`idContactPerson`) REFERENCES `ContactPerson`(`idContactPerson`) ON DELETE RESTRICT ON UPDATE CASCADE;
