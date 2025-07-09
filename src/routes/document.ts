import express from "express";
import { getDocuments, createDocument, updateDocument } from "../controllers/document";

const router = express.Router();

router.route("/").get(getDocuments).post(createDocument);
router.route("/:id").patch(updateDocument)

export default router
