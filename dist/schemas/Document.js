"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialDocumentSchema = exports.DocumentSchema = exports.CustomElementSchema = exports.CustomTextSchema = exports.TextAlignEnum = void 0;
const zod_1 = require("zod");
exports.TextAlignEnum = zod_1.z.enum(["left", "center", "right", "justify"]);
exports.CustomTextSchema = zod_1.z.object({
    text: zod_1.z.string(),
    fontSize: zod_1.z.number(),
    color: zod_1.z.string(),
    bold: zod_1.z.boolean(),
    italic: zod_1.z.boolean(),
    underline: zod_1.z.boolean(),
    backgroundColor: zod_1.z.string(),
    textAlign: exports.TextAlignEnum,
});
exports.CustomElementSchema = zod_1.z.object({
    type: zod_1.z.enum(["paragraph", "code"]),
    textAlign: exports.TextAlignEnum,
    lineHeight: zod_1.z.number(),
    paraSpaceBefore: zod_1.z.number(),
    paraSpaceAfter: zod_1.z.number(),
    fontFamily: zod_1.z.string(),
    children: zod_1.z.array(exports.CustomTextSchema),
});
const DescendantSchema = zod_1.z.union([exports.CustomElementSchema, exports.CustomTextSchema]);
exports.DocumentSchema = zod_1.z.object({
    title: zod_1.z.string(),
    elements: zod_1.z.array(DescendantSchema),
    createdAt: zod_1.z.iso.datetime(),
    updatedAt: zod_1.z.iso.datetime()
});
exports.PartialDocumentSchema = exports.DocumentSchema.partial();
