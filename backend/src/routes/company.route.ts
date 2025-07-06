// routes/company.ts
import { Router } from "express";
import {
  uploadMiddleware,
  createCompany,
  handleMulterError,
  getAllCompaniesExceptUserCompany,
} from "../controllers/company.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", uploadMiddleware, handleMulterError, createCompany);
router.get("/", authMiddleware, getAllCompaniesExceptUserCompany);
export default router;
