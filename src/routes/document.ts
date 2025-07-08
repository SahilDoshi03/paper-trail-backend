import express from "express";
import { getDocuments } from "../controllers/document";

const router = express.Router();

router.route("/").get(getDocuments);

export default router
