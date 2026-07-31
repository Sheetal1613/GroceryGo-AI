import express from "express";
import inventoryRoutes from "./routes/inventory.routes";

const app = express();

app.use(express.json());

// Register Inventory Routes
app.use("/api/inventory", inventoryRoutes);

app.get("/", (_req, res) => {
  res.send("🚀 AI Grocery Go Backend is running...");
});

export default app;