/*
  Warnings:

  - You are about to drop the `auditlogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `phonecompanies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `phoneusers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rolespermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `samples` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userplants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `auditlogs` DROP FOREIGN KEY `AuditLogs_userId_fkey`;

-- DropForeignKey
ALTER TABLE `phonecompanies` DROP FOREIGN KEY `PhoneCompanies_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `phoneusers` DROP FOREIGN KEY `PhoneUsers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `plants` DROP FOREIGN KEY `Plants_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `rolespermissions` DROP FOREIGN KEY `RolesPermissions_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `rolespermissions` DROP FOREIGN KEY `RolesPermissions_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `samples` DROP FOREIGN KEY `Samples_userId_fkey`;

-- DropForeignKey
ALTER TABLE `samples` DROP FOREIGN KEY `Samples_zoneId_fkey`;

-- DropForeignKey
ALTER TABLE `userplants` DROP FOREIGN KEY `UserPlants_plantId_fkey`;

-- DropForeignKey
ALTER TABLE `userplants` DROP FOREIGN KEY `UserPlants_userId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `zones` DROP FOREIGN KEY `Zones_plantId_fkey`;

-- DropTable
DROP TABLE `auditlogs`;

-- DropTable
DROP TABLE `companies`;

-- DropTable
DROP TABLE `permissions`;

-- DropTable
DROP TABLE `phonecompanies`;

-- DropTable
DROP TABLE `phoneusers`;

-- DropTable
DROP TABLE `plants`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `rolespermissions`;

-- DropTable
DROP TABLE `samples`;

-- DropTable
DROP TABLE `userplants`;

-- DropTable
DROP TABLE `users`;

-- DropTable
DROP TABLE `zones`;

-- CreateTable
CREATE TABLE `Role` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(50) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `permissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `permissionName` VARCHAR(100) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolesPermission` (
    `roleId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `fax` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `auditId` INTEGER NOT NULL AUTO_INCREMENT,
    `tableName` VARCHAR(100) NOT NULL,
    `actionType` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`auditId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postbox` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `clientId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `fax` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `addressId` INTEGER NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`clientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phone` (
    `phoneId` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `clientId` VARCHAR(191) NULL,

    PRIMARY KEY (`phoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `projectId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,
    `clientsId` VARCHAR(191) NULL,
    `addressId` INTEGER NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zone` (
    `zoneId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `projectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`zoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sample` (
    `sampleId` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `soilTime` DECIMAL(5, 2) NOT NULL,
    `soilResistivity` DECIMAL(10, 2) NOT NULL,
    `moistureContent` DECIMAL(5, 2) NOT NULL,
    `pHValue` DECIMAL(4, 2) NOT NULL,
    `bufferCapacityPH4_3` DECIMAL(5, 2) NOT NULL,
    `bufferCapacityPH7_0` DECIMAL(5, 2) NOT NULL,
    `sulfurReducingBacteria` DECIMAL(5, 2) NOT NULL,
    `sulfateContent` DECIMAL(5, 2) NOT NULL,
    `neutralSalts` DECIMAL(5, 2) NOT NULL,
    `undergroundWaterPresence` VARCHAR(50) NOT NULL,
    `horizontalSoilHomogeneity` DECIMAL(5, 2) NOT NULL,
    `verticalSoilHomogeneity` DECIMAL(5, 2) NOT NULL,
    `soilTypeHomogeneity` VARCHAR(50) NOT NULL,
    `pHSoilHomogeneity` DECIMAL(5, 2) NOT NULL,
    `externalCathodes` DECIMAL(5, 2) NOT NULL,
    `b0` VARCHAR(191) NOT NULL,
    `b1` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `zoneId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sampleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolesPermission` ADD CONSTRAINT `RolesPermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesPermission` ADD CONSTRAINT `RolesPermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`permissionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Phone` ADD CONSTRAINT `Phone_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Phone` ADD CONSTRAINT `Phone_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`clientId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_clientsId_fkey` FOREIGN KEY (`clientsId`) REFERENCES `Client`(`clientId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sample` ADD CONSTRAINT `Sample_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sample` ADD CONSTRAINT `Sample_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone`(`zoneId`) ON DELETE RESTRICT ON UPDATE CASCADE;
