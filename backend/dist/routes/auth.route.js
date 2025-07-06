"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { loginUser, registerUser } = require("../controllers/auth.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const Router = require("express");
const router = Router();
router.post("/login", auth_controller_1.loginUser);
router.post("/signup", auth_controller_1.registerUser);
exports.default = router;
