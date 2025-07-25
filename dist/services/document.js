"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.createDocument = exports.getDocumentById = exports.getDocuments = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const getDocuments = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.document.findMany({
            where: { ownerId },
            include: {
                elements: {
                    include: {
                        children: true,
                    },
                },
            },
        });
    }
    catch (error) {
        console.error("Error getting documents:", error);
        throw error;
    }
});
exports.getDocuments = getDocuments;
const getDocumentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.document.findUnique({
            where: { id },
            include: {
                elements: {
                    include: {
                        children: true,
                    },
                },
            },
        });
    }
    catch (error) {
        console.error(`Error getting document with id ${id}:`, error);
        throw error;
    }
});
exports.getDocumentById = getDocumentById;
const createDocument = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.document.create({
            data: {
                title: "Untitled Document",
                ownerId,
                readAccessUsers: [],
                writeAccessUsers: [],
                elements: {
                    create: [
                        {
                            type: "paragraph",
                            textAlign: "left",
                            fontFamily: "Arial",
                            paraSpaceAfter: 0,
                            paraSpaceBefore: 0,
                            lineHeight: 1.2,
                            children: {
                                create: [
                                    {
                                        text: "",
                                        textAlign: "left",
                                        color: "#ffffff",
                                        fontSize: 16,
                                        bold: false,
                                        italic: false,
                                        underline: false,
                                        backgroundColor: "transparent",
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            include: {
                elements: {
                    include: {
                        children: true,
                    },
                },
            },
        });
    }
    catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
});
exports.createDocument = createDocument;
const updateDocument = (id, doc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { elements } = doc, restFields = __rest(doc, ["elements"]);
        const data = {};
        for (const [key, value] of Object.entries(restFields)) {
            if (value !== undefined) {
                data[key] = value;
            }
        }
        if (elements && elements.length > 0) {
            yield prisma.textNode.deleteMany({
                where: {
                    element: { documentId: id },
                },
            });
            yield prisma.elementNode.deleteMany({
                where: {
                    documentId: id,
                },
            });
            const elementNodes = elements.filter((el) => typeof el === "object" && "type" in el && "children" in el);
            data.elements = {
                create: elementNodes.map((el) => ({
                    type: el.type,
                    textAlign: el.textAlign,
                    fontFamily: el.fontFamily,
                    paraSpaceAfter: el.paraSpaceAfter,
                    paraSpaceBefore: el.paraSpaceBefore,
                    lineHeight: el.lineHeight,
                    children: {
                        create: el.children.map((child) => ({
                            text: child.text,
                            textAlign: child.textAlign,
                            color: child.color,
                            fontSize: child.fontSize,
                            bold: child.bold,
                            italic: child.italic,
                            underline: child.underline,
                            backgroundColor: child.backgroundColor,
                        })),
                    },
                })),
            };
        }
        if (Object.keys(data).length === 0) {
            throw new Error("No valid fields provided for update.");
        }
        return yield prisma.document.update({
            where: { id },
            data,
            include: {
                elements: {
                    include: {
                        children: true,
                    },
                },
            },
        });
    }
    catch (error) {
        console.error(`Error updating document with id ${id}:`, error);
        throw error;
    }
});
exports.updateDocument = updateDocument;
const deleteDocument = (documentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.textNode.deleteMany({
            where: {
                element: { documentId },
            },
        });
        yield prisma.elementNode.deleteMany({
            where: {
                documentId,
            },
        });
        yield prisma.document.delete({
            where: { id: documentId },
        });
    }
    catch (error) {
        console.error(`Error deleting document with id ${documentId}:`, error);
        throw error;
    }
});
exports.deleteDocument = deleteDocument;
