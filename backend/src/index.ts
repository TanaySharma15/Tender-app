import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import tenderRoutes from "./routes/tender.route";
import companyRouter from "./routes/company.route";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const PORT = process.env.PORT || 8000;

app.use("/auth", authRoutes);
app.use("/tender", tenderRoutes);
app.use("/company", companyRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
