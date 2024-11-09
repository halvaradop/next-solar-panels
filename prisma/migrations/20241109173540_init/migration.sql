/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coordinate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sample` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_idClient_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_idRole_fkey`;

-- DropForeignKey
ALTER TABLE `plant` DROP FOREIGN KEY `Plant_idCoordinate_fkey`;

-- DropForeignKey
ALTER TABLE `plant` DROP FOREIGN KEY `Plant_idEmployee_fkey`;

-- DropForeignKey
ALTER TABLE `sample` DROP FOREIGN KEY `Sample_idZone_fkey`;

-- DropForeignKey
ALTER TABLE `zone` DROP FOREIGN KEY `Zone_idCoordinate_fkey`;

-- DropForeignKey
ALTER TABLE `zone` DROP FOREIGN KEY `Zone_idPlant_fkey`;

-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `coordinate`;

-- DropTable
DROP TABLE `employee`;

-- DropTable
DROP TABLE `plant`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `sample`;

-- DropTable
DROP TABLE `zone`;

-- CreateTable
CREATE TABLE `Roles` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(50) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLogs` (
    `auditId` INTEGER NOT NULL AUTO_INCREMENT,
    `tableName` VARCHAR(100) NOT NULL,
    `recordId` INTEGER NOT NULL,
    `actionType` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    `userId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`auditId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissions` (
    `permissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `permissionName` VARCHAR(100) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolesPermissions` (
    `roleId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Companies` (
    `companyId` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`companyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhoneCompanies` (
    `phoneId` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`phoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plants` (
    `plantId` INTEGER NOT NULL AUTO_INCREMENT,
    `plantName` VARCHAR(100) NOT NULL,
    `companyId` INTEGER NOT NULL,
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`plantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zones` (
    `zoneId` INTEGER NOT NULL AUTO_INCREMENT,
    `plantId` INTEGER NOT NULL,
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,
    `state` ENUM('ACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`zoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhoneUsers` (
    `phoneId` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`phoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeePlants` (
    `userId` INTEGER NOT NULL,
    `plantId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `plantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Samples` (
    `sampleId` INTEGER NOT NULL AUTO_INCREMENT,
    `sampleDateTime` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `zoneId` INTEGER NOT NULL,
    `soilTime` INTEGER NOT NULL,
    `soilResistivity` DECIMAL(10, 2) NOT NULL,
    `moistureContent` DECIMAL(5, 2) NOT NULL,
    `pHValue` DECIMAL(4, 2) NOT NULL,
    `bufferCapacityPH4_3` DECIMAL(5, 2) NOT NULL,
    `bufferCapacityPH7_0` DECIMAL(5, 2) NOT NULL,
    `sulfurReducingBacteria` INTEGER NOT NULL,
    `sulfateContent` DECIMAL(5, 2) NOT NULL,
    `neutralSalts` DECIMAL(5, 2) NOT NULL,
    `undergroundWaterPresence` BOOLEAN NOT NULL,
    `horizontalSoilHomogeneity` VARCHAR(50) NOT NULL,
    `verticalSoilHomogeneity` VARCHAR(50) NOT NULL,
    `soilTypeHomogeneity` VARCHAR(50) NOT NULL,
    `pHSoilHomogeneity` VARCHAR(50) NOT NULL,
    `externalCathodes` BOOLEAN NOT NULL,

    PRIMARY KEY (`sampleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLogs` ADD CONSTRAINT `AuditLogs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesPermissions` ADD CONSTRAINT `RolesPermissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesPermissions` ADD CONSTRAINT `RolesPermissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permissions`(`permissionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneCompanies` ADD CONSTRAINT `PhoneCompanies_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`companyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plants` ADD CONSTRAINT `Plants_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`companyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zones` ADD CONSTRAINT `Zones_plantId_fkey` FOREIGN KEY (`plantId`) REFERENCES `Plants`(`plantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneUsers` ADD CONSTRAINT `PhoneUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeePlants` ADD CONSTRAINT `EmployeePlants_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeePlants` ADD CONSTRAINT `EmployeePlants_plantId_fkey` FOREIGN KEY (`plantId`) REFERENCES `Plants`(`plantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Samples` ADD CONSTRAINT `Samples_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Samples` ADD CONSTRAINT `Samples_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zones`(`zoneId`) ON DELETE RESTRICT ON UPDATE CASCADE;
