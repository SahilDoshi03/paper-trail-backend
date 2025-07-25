"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const document_1 = require("../controllers/document");
const router = express_1.default.Router();
router
    .route("/")
    .get(document_1.getDocuments)
    .post(document_1.createDocument);
router
    .route("/:id")
    .get(document_1.getDocumentById)
    .patch(document_1.updateDocument)
    .delete(document_1.deleteDocument);
exports.default = router;
