const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
import authRoutes from "./routes/auth.route";
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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
