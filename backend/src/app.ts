import express from "express";
import cors from "cors";

import inventoryRoutes from "./routes/inventory.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());

app.use(express.json());

// Register Auth Routes
app.use("/api/auth", authRoutes);

// Register Inventory Routes
app.use("/api/inventory", inventoryRoutes);

app.get("/", (_req, res) => {
  res.send("🚀 AI Grocery Go Backend is running...");
});

export default app;