import express from "express";
import { getDocuments, createDocument } from "../controllers/document";

const router = express.Router();

router.route("/").get(getDocuments).post(createDocument);

export default router
