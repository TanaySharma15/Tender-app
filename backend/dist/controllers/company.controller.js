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
exports.createCompany = void 0;
const db_1 = __importDefault(require("../db"));
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, industry, location, description, services, employees, founded, website, } = req.body;
        if (!name ||
            !industry ||
            !location ||
            !description ||
            !services ||
            !employees ||
            !founded ||
            !website) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }
        const [company] = yield (0, db_1.default)("companies")
            .insert({
            name,
            industry,
            location,
            description,
            services: JSON.stringify(services),
            employees,
            founded,
            website,
        })
            .returning("*");
        res.status(201).json(company);
    }
    catch (err) {
        console.error("Error creating company:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCompany = createCompany;
