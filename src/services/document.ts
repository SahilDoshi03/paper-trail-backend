import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const getDocuments = () => {
  return prisma.document.findMany();
};

const getDocumentById = (id: number) => {
  return prisma.document.findUnique({
    where: { id },
    include: {
      elements: {
        include: {
          children: true,
        },
      },
    },
  });
};

const createDocument = () => {
  return prisma.document.create({
    data: {
      title: "Untitled Document",
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
};

const updateDocument = async (
  id: number,
  title?: string,
  elements?: any[]
) => {
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

    return prisma.document.update({
      where: { id },
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
  }

  return prisma.document.update({
    where: { id },
    data: {
      ...(title ? { title } : {}),
    },
    include: {
      elements: {
        include: {
          children: true,
        },
      },
    },
  });
};

const deleteDocument = async (id: number) => {
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

  await prisma.document.delete({
    where: { id },
  });
};

export {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
