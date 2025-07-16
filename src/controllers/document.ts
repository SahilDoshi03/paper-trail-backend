import { Request, Response } from "express";
import * as documentService from "../services/document";
import { PartialDocumentSchema } from "../schemas/Document";
import z from "zod";

export const getDocuments = async (_: Request, res: Response) => {
  try {
    const documents = await documentService.getDocuments();
    res.status(200).json({ count: documents.length, documents });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  const docId = parseInt(req.params.id, 10);

  if (isNaN(docId)) {
    res.status(400).json({ error: "Invalid document ID" });
    return;
  }

  try {
    const document = await documentService.getDocumentById(docId);
    if (!document) {
      res.status(404).json({ error: "Document not found" });
      return;
    }
    res.status(200).json({ document });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createDocument = async (_: Request, res: Response) => {
  try {
    const document = await documentService.createDocument();
    res.status(201).json({ document });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDocument = async (req: Request, res: Response) => {
  const docId = parseInt(req.params.id, 10);
  if (isNaN(docId)) {
    res.status(400).json({ error: "Invalid document ID" });
    return;
  }

  try {
    const doc = req.body;
    const document = await documentService.updateDocument(docId, doc);
    PartialDocumentSchema.parse(doc);

    res.status(200).json({ document });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation Error" });
    }
    res.status(500).json({ error: "Failed to update document" });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  const docId = parseInt(req.params.id, 10);
  if (isNaN(docId)) {
    res.status(400).json({ error: "Invalid document ID" });
    return;
  }

  try {
    await documentService.deleteDocument(docId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete document" });
  }
};
