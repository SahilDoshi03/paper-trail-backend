"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router
    .route("/")
    .get(user_1.getUsers)
    .get(user_1.getUserByEmail)
    .post(user_1.createUser);
router
    .route("/:id")
    .get(user_1.getUserById)
    .patch(user_1.updateUser)
    .delete(user_1.deleteUser);
exports.default = router;
