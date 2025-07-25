"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialUserSchema = exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserSchema = zod_1.default.object({
    id: zod_1.default.string().optional(),
    name: zod_1.default.string(),
    email: zod_1.default.email().optional(),
    createdAt: zod_1.default.iso.datetime().optional(),
    updatedAt: zod_1.default.iso.datetime().optional()
});
exports.PartialUserSchema = exports.UserSchema.partial();
