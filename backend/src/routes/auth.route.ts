const { Router } = require("express");
// const { loginUser, registerUser } = require("../controllers/auth.controller");
import { loginUser, registerUser } from "../controllers/auth.controller";
const router = Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);

export default router;
