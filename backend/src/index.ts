import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const PORT = process.env.PORT || 8000;

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  `Server is running on port: ${PORT}`;
});
