import express from "express";
import { createCompany } from "../controllers/company.controller";

const router = express.Router();

router.post("/", createCompany);

export default router;
