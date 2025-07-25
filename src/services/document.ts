import { PrismaClient } from "../generated/prisma";
import type { Prisma } from "../generated/prisma";
import { CustomElement, PartialDocumentType } from "../schemas/Document";

const prisma = new PrismaClient();

const getDocuments = async (ownerId?: string) => {
  try {
    return await prisma.document.findMany({
      where: { ownerId },
      include: {
        elements: {
          include: {
            children: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

const getDocumentById = async (id: string) => {
  try {
    return await prisma.document.findUnique({
      where: { id },
      include: {
        elements: {
          include: {
            children: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error getting document with id ${id}:`, error);
    throw error;
  }
};



const createDocument = async (ownerId: string) => {
  try {
    return await prisma.document.create({
      data: {
        title: "Untitled Document",
        ownerId,
        readAccessUsers: [],
        writeAccessUsers: [],
        elements: {
          create: [
            {
              type: "paragraph",
              textAlign: "left",
              fontFamily: "Arial",
              paraSpaceAfter: 0,
              paraSpaceBefore: 0,
              lineHeight: 1.2,
              children: {
                create: [
                  {
                    text: "",
                    textAlign: "left",
                    color: "#ffffff",
                    fontSize: 16,
                    bold: false,
                    italic: false,
                    underline: false,
                    backgroundColor: "transparent",
                  },
                ],
              },
            },
          ],
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
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

const updateDocument = async (id: string, doc: PartialDocumentType) => {
  try {
    const { elements, ...restFields } = doc;

    const data: Partial<Prisma.DocumentUpdateInput> = {};

    for (const [key, value] of Object.entries(restFields)) {
      if (value !== undefined) {
        data[key as keyof typeof restFields] = value;
      }
    }

    if (elements && elements.length > 0) {
      await prisma.textNode.deleteMany({
        where: {
          element: { documentId: id },
        },
      });

      await prisma.elementNode.deleteMany({
        where: {
          documentId: id,
        },
      });

      const elementNodes = elements.filter(
        (el): el is CustomElement =>
          typeof el === "object" && "type" in el && "children" in el
      );

      data.elements = {
        create: elementNodes.map(
          (el): Prisma.ElementNodeCreateWithoutDocumentInput => ({
            type: el.type,
            textAlign: el.textAlign,
            fontFamily: el.fontFamily,
            paraSpaceAfter: el.paraSpaceAfter,
            paraSpaceBefore: el.paraSpaceBefore,
            lineHeight: el.lineHeight,
            children: {
              create: el.children.map(
                (child): Prisma.TextNodeCreateWithoutElementInput => ({
                  text: child.text,
                  textAlign: child.textAlign,
                  color: child.color,
                  fontSize: child.fontSize,
                  bold: child.bold,
                  italic: child.italic,
                  underline: child.underline,
                  backgroundColor: child.backgroundColor,
                })
              ),
            },
          })
        ),
      };
    }

    if (Object.keys(data).length === 0) {
      throw new Error("No valid fields provided for update.");
    }

    return await prisma.document.update({
      where: { id },
      data,
      include: {
        elements: {
          include: {
            children: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error updating document with id ${id}:`, error);
    throw error;
  }
};

const deleteDocument = async (documentId: string) => {
  try {
    await prisma.textNode.deleteMany({
      where: {
        element: { documentId },
      },
    });

    await prisma.elementNode.deleteMany({
      where: {
        documentId,
      },
    });

    await prisma.document.delete({
      where: { id: documentId },
    });
  } catch (error) {
    console.error(`Error deleting document with id ${documentId}:`, error);
    throw error;
  }
};

export {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
