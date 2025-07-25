import express from "express";
import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/document";

const router = express.Router();

router
  .route("/")
  .get(getDocuments)
  .post(createDocument);

router
  .route("/:id")
  .get(getDocumentById)
  .patch(updateDocument)
  .delete(deleteDocument);

export default router;
