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
exports.getAllCompaniesExceptUserCompany = exports.createCompany = exports.handleMulterError = exports.uploadMiddleware = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const multer_1 = __importDefault(require("multer"));
const db_1 = __importDefault(require("../db"));
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
});
exports.uploadMiddleware = upload.single("image");
const handleMulterError = (error, req, res, next) => {
    if (error && error.code) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res
                .status(400)
                .json({ message: "File size too large. Maximum 5MB allowed." });
        }
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ message: "Unexpected file field." });
        }
    }
    if (error && error.message && error.message.includes("Only image files")) {
        return res.status(400).json({ message: "Only image files are allowed." });
    }
    next(error);
};
exports.handleMulterError = handleMulterError;
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        let logoUrl = null;
        const file = req.file;
        if (file) {
            try {
                if (!file.mimetype.startsWith("image/")) {
                    res.status(400).json({ message: "Only image files are allowed." });
                    return;
                }
                const fileExt = ((_a = file.originalname) === null || _a === void 0 ? void 0 : _a.split(".").pop()) || "jpg";
                console.log("File ext->", fileExt);
                const fileName = `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(2)}.${fileExt}`;
                const filePath = `company-logos/${fileName}`;
                console.log("file path-> ", filePath);
                const { data: uploadData, error: uploadError } = yield supabase.storage
                    .from("company-logo")
                    .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false,
                });
                if (uploadError) {
                    res.status(500).json({ message: "Failed to upload image" });
                    return;
                }
                const { data: urlData } = supabase.storage
                    .from("company-logo")
                    .getPublicUrl(filePath);
                logoUrl = urlData.publicUrl;
            }
            catch (imageError) {
                console.error("Image processing error:", imageError);
                res.status(500).json({ message: "Failed to process image" });
                return;
            }
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
            logo: logoUrl,
        })
            .returning("*");
        res.status(201).json(Object.assign(Object.assign({}, company), { services: typeof company.services === "string"
                ? JSON.parse(company.services)
                : company.services }));
    }
    catch (err) {
        console.error("Error creating company:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCompany = createCompany;
const getAllCompaniesExceptUserCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield (0, db_1.default)("companies").select("*");
        res.status(200).json({ companies });
    }
    catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.getAllCompaniesExceptUserCompany = getAllCompaniesExceptUserCompany;
