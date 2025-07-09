import express from "express";
import {
  getDocuments,
  createDocument,
  updateDocument,
  getDocumentById,
} from "../controllers/document";

const router = express.Router();

router.route("/").get(getDocuments).post(createDocument);
router.route("/:id").get(getDocumentById).patch(updateDocument);

export default router;
