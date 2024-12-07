/*
  Warnings:

  - You are about to drop the column `Z1` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z10` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z11` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z12` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z13` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z14` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z15` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z2` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z3` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z4` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z5` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z6` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z7` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z8` on the `positionsoildata` table. All the data in the column will be lost.
  - You are about to drop the column `Z9` on the `positionsoildata` table. All the data in the column will be lost.
  - Added the required column `z1` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z10` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z11` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z12` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z13` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z14` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z15` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z2` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z3` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z4` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z5` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z6` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z7` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z8` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `z9` to the `PositionSoilData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `positionsoildata` DROP COLUMN `Z1`,
    DROP COLUMN `Z10`,
    DROP COLUMN `Z11`,
    DROP COLUMN `Z12`,
    DROP COLUMN `Z13`,
    DROP COLUMN `Z14`,
    DROP COLUMN `Z15`,
    DROP COLUMN `Z2`,
    DROP COLUMN `Z3`,
    DROP COLUMN `Z4`,
    DROP COLUMN `Z5`,
    DROP COLUMN `Z6`,
    DROP COLUMN `Z7`,
    DROP COLUMN `Z8`,
    DROP COLUMN `Z9`,
    ADD COLUMN `z1` INTEGER NOT NULL,
    ADD COLUMN `z10` INTEGER NOT NULL,
    ADD COLUMN `z11` INTEGER NOT NULL,
    ADD COLUMN `z12` INTEGER NOT NULL,
    ADD COLUMN `z13` INTEGER NOT NULL,
    ADD COLUMN `z14` INTEGER NOT NULL,
    ADD COLUMN `z15` INTEGER NOT NULL,
    ADD COLUMN `z2` INTEGER NOT NULL,
    ADD COLUMN `z3` INTEGER NOT NULL,
    ADD COLUMN `z4` INTEGER NOT NULL,
    ADD COLUMN `z5` INTEGER NOT NULL,
    ADD COLUMN `z6` INTEGER NOT NULL,
    ADD COLUMN `z7` INTEGER NOT NULL,
    ADD COLUMN `z8` INTEGER NOT NULL,
    ADD COLUMN `z9` INTEGER NOT NULL;
