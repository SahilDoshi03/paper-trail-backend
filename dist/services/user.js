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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.user.findMany();
    }
    catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.user.findUnique({
            where: { id },
        });
    }
    catch (error) {
        console.error(`Error getting user with id ${id}:`, error);
        throw error;
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.user.findUnique({
            where: { email },
        });
    }
    catch (error) {
        console.error(`Error getting user with email ${email}:`, error);
        throw error;
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.user.create({
            data: userData,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
});
exports.createUser = createUser;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.user.update({
            where: { id },
            data: userData,
        });
    }
    catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw error;
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.delete({
            where: { id },
        });
    }
    catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw error;
    }
});
exports.deleteUser = deleteUser;
