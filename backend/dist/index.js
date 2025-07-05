"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
const PORT = process.env.PORT || 8000;
app.use("/auth", auth_route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
