"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.createDocument = exports.getDocumentById = exports.getDocuments = void 0;
const documentService = __importStar(require("../services/document"));
const Document_1 = require("../schemas/Document");
const zod_1 = __importDefault(require("zod"));
const getDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = zod_1.default.object({
        'x-user-id': zod_1.default.coerce.number(),
    });
    const result = schema.safeParse(req.headers);
    if (!result.success) {
        res.status(400).json({ error: "Invalid or missing userId" });
        return;
    }
    const userId = result.data['x-user-id'];
    try {
        if (userId) {
            const documents = yield documentService.getDocuments(userId);
            res.status(200).json({ count: documents.length, documents });
        }
        else {
            const documents = yield documentService.getDocuments();
            res.status(200).json({ count: documents.length, documents });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch documents" });
    }
});
exports.getDocuments = getDocuments;
const getDocumentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = parseInt(req.params.id, 10);
    const schema = zod_1.default.object({
        'x-user-id': zod_1.default.coerce.number(),
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
        const document = yield documentService.getDocumentById(docId);
        if (!document) {
            res.status(404).json({ error: "Document not found" });
            return;
        }
        const hasReadAccess = document.ownerId === userId || document.readAccessUsers.includes(userId);
        if (!hasReadAccess) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        res.status(200).json({ document });
    }
    catch (error) {
        console.error("Error retrieving document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getDocumentById = getDocumentById;
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ownerId = req.body.id;
    try {
        const document = yield documentService.createDocument(ownerId);
        res.status(201).json({ document });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createDocument = createDocument;
const updateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = parseInt(req.params.id, 10);
    const userId = req.body.id;
    if (isNaN(docId)) {
        res.status(400).json({ error: "Invalid document ID" });
        return;
    }
    try {
        const doc = req.body;
        const document = yield documentService.getDocumentById(docId);
        if (!document) {
            res.status(404).json({ error: "Document not found" });
            return;
        }
        const hasWriteAccess = document.ownerId === userId || document.writeAccessUsers.includes(userId);
        if (!hasWriteAccess) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        const updatedDocument = yield documentService.updateDocument(docId, doc);
        Document_1.PartialDocumentSchema.parse(doc);
        res.status(200).json({ document: updatedDocument });
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            res.status(400).json({ error: "Validation Error" });
        }
        res.status(500).json({ error: "Failed to update document" });
    }
});
exports.updateDocument = updateDocument;
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = parseInt(req.params.id, 10);
    const userId = req.body.id;
    if (isNaN(docId)) {
        res.status(400).json({ error: "Invalid document ID" });
        return;
    }
    try {
        const document = yield documentService.getDocumentById(docId);
        if (!document) {
            res.status(404).json({ error: "Document not found" });
            return;
        }
        if (document.ownerId !== userId) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        yield documentService.deleteDocument(docId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete document" });
    }
});
exports.deleteDocument = deleteDocument;
