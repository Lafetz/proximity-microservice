/*
  Warnings:

  - The `latitude` column on the `Business` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `Business` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 23,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 23;
