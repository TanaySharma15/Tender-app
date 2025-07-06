"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../config/jwt.config");
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_config_1.JWT_SECRET);
        if (typeof decoded === "object" && "id" in decoded && "email" in decoded) {
            req.user = {
                id: decoded.id,
                email: decoded.email,
            };
            next();
        }
        else {
            res.status(403).json({ message: "Invalid token payload" });
        }
    }
    catch (err) {
        res.status(403).json({ message: "Token verification failed" });
    }
};
exports.authMiddleware = authMiddleware;
