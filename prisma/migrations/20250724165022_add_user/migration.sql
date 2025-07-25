/*
  Warnings:

  - Added the required column `owner` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fontSize` on the `TextNode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "owner" INTEGER NOT NULL,
ADD COLUMN     "readAccessUsers" INTEGER[],
ADD COLUMN     "writeAccessUsers" INTEGER[];

-- AlterTable
ALTER TABLE "TextNode" DROP COLUMN "fontSize",
ADD COLUMN     "fontSize" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
