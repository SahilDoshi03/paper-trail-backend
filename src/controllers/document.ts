import { Request, Response } from "express";
import * as documentService from "../services/document";
import { PartialDocumentSchema } from "../schemas/Document";
import z from "zod";

const getDocuments = async (req: Request, res: Response) => {

  const schema = z.object({
    'x-user-id': z.coerce.number(),
  });

  const result = schema.safeParse(req.headers);

  if (!result.success) {
    res.status(400).json({ error: "Invalid or missing userId" });
    return;
  }

  const userId = result.data['x-user-id'];


  try {
    if (userId) {
      const documents = await documentService.getDocuments(userId);
      res.status(200).json({ count: documents.length, documents });
    } else {
      const documents = await documentService.getDocuments();
      res.status(200).json({ count: documents.length, documents });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

const getDocumentById = async (req: Request, res: Response) => {
  const docId = parseInt(req.params.id, 10);

  const schema = z.object({
    'x-user-id': z.coerce.number(),
  });

  const result = schema.safeParse(req.headers);

  if (isNaN(docId)) {
    res.status(400).json({ error: "Invalid document ID" });
    return;
  }

  if (!result.success) {
    res.status(400).json({ error: "Invalid or missing userId" });
    return;
  }

  const userId = result.data['x-user-id'];

  try {
    const document = await documentService.getDocumentById(docId);
    if (!document) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    const hasReadAccess =
      document.ownerId === userId || document.readAccessUsers.includes(userId);

    if (!hasReadAccess) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    res.status(200).json({ document });
  } catch (error) {
    console.error("Error retrieving document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createDocument = async (req: Request, res: Response) => {
  const ownerId: number = req.body.ownerId
  try {
    const document = await documentService.createDocument(ownerId);
    res.status(201).json({ document });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDocument = async (req: Request, res: Response) => {
  const docId = parseInt(req.params.id, 10);
  const userId = req.body.id;

  if (isNaN(docId)) {
    res.status(400).json({ error: "Invalid document ID" });
    return;
  }

  try {
    const doc = req.body;
    const document = await documentService.getDocumentById(docId);

    if (!document) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    const hasWriteAccess =
      document.ownerId === userId || document.writeAccessUsers.includes(userId);

    if (!hasWriteAccess) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const updatedDocument = await documentService.updateDocument(docId, doc);
    PartialDocumentSchema.parse(doc);

    res.status(200).json({ document: updatedDocument });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation Error" });
    }
    res.status(500).json({ error: "Failed to update document" });
  }
};

const deleteDocument = async (req: Request, res: Response) => {
  const docId = parseInt(req.params.id, 10);
  const userId = req.body.id;

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

    if (document.ownerId !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    await documentService.deleteDocument(docId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete document" });
  }
};

export {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument
}
