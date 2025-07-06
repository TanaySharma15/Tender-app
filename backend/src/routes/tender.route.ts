import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  browseTenders,
  createTender,
  getMyTenders,
  getTenderById,
} from "../controllers/tender.controllers";

const router = Router();

router.post("/", authMiddleware, createTender);
router.get("/my", authMiddleware, getMyTenders);
router.get("/all", authMiddleware, browseTenders);
router.get("/:tenderId", authMiddleware, getTenderById);
export default router;
