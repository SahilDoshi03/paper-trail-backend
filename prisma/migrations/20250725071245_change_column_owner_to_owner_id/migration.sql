/*
  Warnings:

  - You are about to drop the column `owner` on the `Document` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "owner",
ADD COLUMN     "ownerId" INTEGER NOT NULL;
