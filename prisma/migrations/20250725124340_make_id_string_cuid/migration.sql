/*
  Warnings:

  - The primary key for the `Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ElementNode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TextNode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ElementNode" DROP CONSTRAINT "ElementNode_documentId_fkey";

-- DropForeignKey
ALTER TABLE "TextNode" DROP CONSTRAINT "TextNode_elementId_fkey";

-- AlterTable
ALTER TABLE "Document" DROP CONSTRAINT "Document_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Document_id_seq";

-- AlterTable
ALTER TABLE "ElementNode" DROP CONSTRAINT "ElementNode_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "documentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ElementNode_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ElementNode_id_seq";

-- AlterTable
ALTER TABLE "TextNode" DROP CONSTRAINT "TextNode_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "elementId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TextNode_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TextNode_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "ElementNode" ADD CONSTRAINT "ElementNode_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextNode" ADD CONSTRAINT "TextNode_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "ElementNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
