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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const db_1 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, companyName } = req.body;
    console.log("REq.body-> ", req.body);
    try {
        if (!email || !password || !companyName) {
            return res.status(400).json({ error: "Missing fields", body: req.body });
        }
        const existingUser = yield (0, db_1.default)("users").where({ email }).first();
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield (0, db_1.default)("users")
            .insert({
            email,
            password: hashedPassword,
            company_name: companyName,
        })
            .returning(["id", "email", "company_name"]);
        return res.status(201).json({
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Signup failed", detail: error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, db_1.default)("users").where({ email }).first();
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
        return res.status(200).json({ message: "Login successful", data: user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Login failed", detail: error });
    }
});
exports.loginUser = loginUser;
