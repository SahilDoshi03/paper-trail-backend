/*
  Warnings:

  - You are about to drop the `document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "document";

-- CreateTable
CREATE TABLE "ElementNode" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "textAlign" TEXT NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "paraSpaceAfter" INTEGER NOT NULL,
    "paraSpaceBefore" INTEGER NOT NULL,
    "lineHeight" DOUBLE PRECISION NOT NULL,
    "documentId" INTEGER NOT NULL,

    CONSTRAINT "ElementNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextNode" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "textAlign" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "fontSize" TEXT NOT NULL,
    "bold" BOOLEAN NOT NULL,
    "italic" BOOLEAN NOT NULL,
    "underline" BOOLEAN NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "elementId" INTEGER NOT NULL,

    CONSTRAINT "TextNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled Document',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ElementNode" ADD CONSTRAINT "ElementNode_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextNode" ADD CONSTRAINT "TextNode_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "ElementNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
