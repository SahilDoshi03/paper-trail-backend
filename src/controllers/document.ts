import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const getDocuments = async (_: Request, res: Response) => {
  try {
    const documents = await prisma.document.findMany();
    res.status(200).json({ count: documents.length, documents });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

const createDocument = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const newDocument = await prisma.document.create({
      data: {
        title: title || "Untitled Document",
      },
    });

    res.status(201).json({ document: newDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDocument = async (req: Request, res: Response) => {
  const docId = parseInt(req.params.id);
  const { title, elements } = req.body;

  if (isNaN(docId)) {
    res.status(400).json({ error: "Invalid document ID" });
  }

  try {
    await prisma.textNode.deleteMany({
      where: {
        element: {
          documentId: docId,
        },
      },
    });

    await prisma.elementNode.deleteMany({
      where: {
        documentId: docId,
      },
    });

    const elementData = elements.map((el: any) => ({
      type: el.type,
      textAlign: el.textAlign,
      fontFamily: el.fontFamily,
      paraSpaceAfter: el.paraSpaceAfter,
      paraSpaceBefore: el.paraSpaceBefore,
      lineHeight: el.lineHeight,
      children: {
        create: el.children.map((child: any) => ({
          text: child.text,
          textAlign: child.textAlign,
          color: child.color,
          fontSize: child.fontSize,
          bold: child.bold,
          italic: child.italic,
          underline: child.underline,
          backgroundColor: child.backgroundColor,
        })),
      },
    }));

    const updatedDocument = await prisma.document.update({
      where: { id: docId },
      data: {
        title: title || undefined,
        elements: {
          create: elementData,
        },
      },
      include: {
        elements: {
          include: {
            children: true,
          },
        },
      },
    });

    res.status(200).json({ document: updatedDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update document" });
  }
};


export { getDocuments, createDocument, updateDocument };

