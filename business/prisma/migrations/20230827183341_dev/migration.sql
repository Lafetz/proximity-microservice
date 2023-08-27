/*
  Warnings:

  - You are about to drop the column `longitude` on the `Business` table. All the data in the column will be lost.
  - Added the required column `business_Type` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "longitude",
ADD COLUMN     "business_Type" TEXT NOT NULL;
