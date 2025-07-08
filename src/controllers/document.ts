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

const createDocument = async (_: Request, res: Response) => {
  try {
    const newDocument = await prisma.document.create({
      data: {
        content: "New Doc",
      },
    });

    res.status(201).json({ document: newDocument });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { getDocuments, createDocument };

