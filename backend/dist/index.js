"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const tender_route_1 = __importDefault(require("./routes/tender.route"));
const company_route_1 = __importDefault(require("./routes/company.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
const PORT = process.env.PORT || 8000;
app.use("/auth", auth_route_1.default);
app.use("/tender", tender_route_1.default);
app.use("/company", company_route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
