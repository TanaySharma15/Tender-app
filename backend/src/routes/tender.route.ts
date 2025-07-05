import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createTender } from "../controllers/tender.controllers";

const router = Router();

router.post("/api/tenders", authMiddleware, createTender);

export default router;
