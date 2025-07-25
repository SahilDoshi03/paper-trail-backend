"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const document_1 = __importDefault(require("./routes/document"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/api/healthcheck", (_, res) => {
    res.status(200).send("App is running");
});
app.use("/api/documents", document_1.default);
app.use("/api/users", user_1.default);
const server = app.listen(PORT, () => {
    console.log(`App listnening on port ${PORT}`);
});
server.on("error", (err) => {
    console.error(err);
});
