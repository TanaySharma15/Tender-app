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
exports.getTenderById = exports.getMyTenders = exports.browseTenders = exports.createTender = void 0;
const db_1 = __importDefault(require("../db"));
const db_2 = __importDefault(require("../db"));
const createTender = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { title, description, deadline, budget } = req.body;
    if (!title || !description || !deadline || !budget) {
        res.status(400).json({ message: "All fields are required." });
        return;
    }
    try {
        const [tender] = yield (0, db_1.default)("tenders")
            .insert({
            title,
            description,
            budget: parseFloat(budget),
            deadline: new Date(deadline),
            created_by: userId,
        })
            .returning("*");
        res.status(201).json({ message: "Tender created", tender });
    }
    catch (error) {
        console.error("Error creating tender:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.createTender = createTender;
const browseTenders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const search = ((_b = req.query.search) === null || _b === void 0 ? void 0 : _b.toString().trim()) || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        // Build base query
        const baseQuery = (0, db_1.default)("tenders")
            .join("users", "tenders.created_by", "users.id")
            .whereNot("tenders.created_by", userId);
        if (search) {
            baseQuery.andWhere((qb) => {
                qb.whereILike("tenders.title", `%${search}%`)
                    .orWhereILike("tenders.description", `%${search}%`)
                    .orWhereILike("users.company_name", `%${search}%`);
            });
        }
        // Get total count
        const total = yield baseQuery.clone().count("tenders.id as count").first();
        // Get paginated tenders
        const rows = yield baseQuery
            .clone()
            .select("tenders.id", "tenders.title", "tenders.description", "tenders.budget", "tenders.deadline", "tenders.created_at", "tenders.updated_at", "users.company_name")
            .orderBy("tenders.created_at", "desc")
            .limit(limit)
            .offset(offset);
        const tenders = rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            budget: row.budget,
            deadline: row.deadline,
            created_at: row.created_at,
            updated_at: row.updated_at,
            company: {
                name: row.company_name,
            },
        }));
        res.json({
            page,
            limit,
            total: Number((total === null || total === void 0 ? void 0 : total.count) || 0),
            totalPages: Math.ceil(Number((total === null || total === void 0 ? void 0 : total.count) || 0) / limit),
            tenders,
        });
    }
    catch (err) {
        console.error("Error browsing tenders:", err);
        res.status(500).json({ message: "Failed to browse tenders" });
    }
});
exports.browseTenders = browseTenders;
const getMyTenders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const allTenders = yield (0, db_2.default)("tenders").where({ created_by: user.id });
        const totalTenders = allTenders.length;
        const activeTenders = allTenders.filter((t) => new Date(t.deadline) > new Date());
        res.json({
            totalTenders,
            activeTendersCount: activeTenders.length,
            tenders: allTenders,
        });
    }
    catch (err) {
        console.error("Error in getMyTenders:", err);
        res.status(500).json({ message: "Failed to fetch your tenders" });
    }
});
exports.getMyTenders = getMyTenders;
const getTenderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenderId } = req.params;
    try {
        const tender = yield (0, db_1.default)("tenders")
            .join("users", "tenders.created_by", "users.id")
            .where("tenders.id", tenderId)
            .select("tenders.*", "users.company_name as creator_company", "users.email as creator_email")
            .first();
        if (!tender) {
            res.status(404).json({ message: "Tender not found" });
            return;
        }
        res.json(tender);
    }
    catch (error) {
        console.error("Error fetching tender by ID:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.getTenderById = getTenderById;
