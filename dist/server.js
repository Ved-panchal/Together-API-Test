"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
const server = (0, http_1.createServer)(app_1.default);
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
