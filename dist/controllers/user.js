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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = void 0;
const userService = __importStar(require("../services/user"));
const User_1 = require("../schemas/User");
const zod_1 = __importDefault(require("zod"));
const getUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getUsers();
        res.status(200).json({ count: users.length, users });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const user = yield userService.getUserById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    try {
        const user = yield userService.getUserByEmail(userEmail);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = User_1.UserSchema.parse(req.body);
        const user = yield userService.createUser(userData);
        res.status(201).json({ user });
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            res.status(400).json({ error: "Validation Error", details: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const userData = User_1.PartialUserSchema.parse(req.body);
        const updatedUser = yield userService.updateUser(userId, userData);
        res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            res.status(400).json({ error: "Validation Error", details: error.message });
        }
        res.status(500).json({ error: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        yield userService.deleteUser(userId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
