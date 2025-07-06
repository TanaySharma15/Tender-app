"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/company.ts
const express_1 = require("express");
const company_controller_1 = require("../controllers/company.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/create", company_controller_1.uploadMiddleware, company_controller_1.handleMulterError, company_controller_1.createCompany);
router.get("/", auth_middleware_1.authMiddleware, company_controller_1.getAllCompaniesExceptUserCompany);
exports.default = router;
